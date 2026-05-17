#!/usr/bin/env node
/**
 * Daily Notion dev log uploader (4am KST window)
 *
 * - Collects git commits from yesterday 04:00 KST → today 04:00 KST
 * - Uses Claude to summarize work + generate prioritized todo list
 * - Creates a Notion page inside the "AI 데이팅앱" project
 */

import { execSync } from 'child_process';
import Anthropic from '@anthropic-ai/sdk';
import { Client } from '@notionhq/client';

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const notion = new Client({ auth: process.env.NOTION_TOKEN });
const NOTION_PAGE_ID = process.env.NOTION_PAGE_ID;

// ── Time window ────────────────────────────────────────────────────────────────
function getWindow() {
  const now = new Date();
  // "today 04:00 KST"
  const todayFour = new Date(now);
  todayFour.setHours(4, 0, 0, 0);
  // if current time is before 04:00 KST, window end is today 04:00 and start is yesterday 04:00
  const windowEnd = todayFour;
  const windowStart = new Date(windowEnd.getTime() - 24 * 60 * 60 * 1000);
  return { windowStart, windowEnd };
}

function fmtISO(d) {
  return d.toISOString().replace('T', ' ').slice(0, 16);
}

// ── Git log ────────────────────────────────────────────────────────────────────
function getGitLog(since, until) {
  try {
    const log = execSync(
      `git log --since="${fmtISO(since)}" --until="${fmtISO(until)}" --pretty=format:"%h %s (%an, %ar)" --date=local`,
      { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'pipe'] }
    ).trim();
    return log || '(커밋 없음)';
  } catch {
    return '(git log 실패)';
  }
}

function getDiff(since, until) {
  try {
    // files changed summary
    const diff = execSync(
      `git diff --stat $(git log --since="${fmtISO(since)}" --until="${fmtISO(until)}" --pretty=format:"%H" | tail -1)^..HEAD 2>/dev/null || echo ""`,
      { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'pipe'] }
    ).trim();
    return diff.slice(0, 1500); // cap length
  } catch {
    return '';
  }
}

// ── Claude summary + todo ──────────────────────────────────────────────────────
async function generateSummaryAndTodo(gitLog, diffSummary, dateLabel) {
  const prompt = `
당신은 AI 소개팅 앱 "설렘(Seollem)" 개발팀의 기술 PM 역할을 맡았습니다.
아래는 ${dateLabel} 하루 동안의 git commit 기록입니다.

[커밋 로그]
${gitLog}

[변경 파일 요약]
${diffSummary || '(없음)'}

다음 두 가지를 JSON으로 반환해주세요:

1. summary: 오늘 무엇을 했는지 2~4 문장 요약 (한국어, 개발자 노트 스타일)
2. todos: 내일 해야 할 것들. 각 항목은 { priority: "🔴 높음" | "🟡 중간" | "🟢 낮음", task: string, reason: string } 형태. 4~7개.
   - 오늘 작업의 자연스러운 다음 단계
   - 버그/빈틈이 보이면 포함
   - 배포/검증 항목 포함

JSON만 반환. 마크다운 코드블록 없이.
`.trim();

  const msg = await anthropic.messages.create({
    model: 'claude-opus-4-7',
    max_tokens: 1024,
    messages: [{ role: 'user', content: prompt }],
  });

  const text = msg.content[0].text.trim();
  return JSON.parse(text);
}

// ── Notion helpers ─────────────────────────────────────────────────────────────
function richText(content) {
  return [{ type: 'text', text: { content: String(content) } }];
}

function heading(level, text) {
  const types = { 2: 'heading_2', 3: 'heading_3' };
  return {
    object: 'block',
    type: types[level],
    [types[level]]: { rich_text: richText(text) },
  };
}

function paragraph(text) {
  return {
    object: 'block',
    type: 'paragraph',
    paragraph: { rich_text: richText(text) },
  };
}

function callout(text, emoji) {
  return {
    object: 'block',
    type: 'callout',
    callout: {
      rich_text: richText(text),
      icon: { type: 'emoji', emoji },
      color: 'default',
    },
  };
}

function divider() {
  return { object: 'block', type: 'divider', divider: {} };
}

function todoBlock(text, checked = false) {
  return {
    object: 'block',
    type: 'to_do',
    to_do: { rich_text: richText(text), checked },
  };
}

function codeBlock(text) {
  return {
    object: 'block',
    type: 'code',
    code: {
      rich_text: richText(text),
      language: 'plain text',
    },
  };
}

// ── Main ───────────────────────────────────────────────────────────────────────
async function main() {
  const { windowStart, windowEnd } = getWindow();

  const dateLabel = windowStart.toLocaleDateString('ko-KR', {
    year: 'numeric', month: 'long', day: 'numeric', weekday: 'long',
  });
  const pageTitle = `📅 ${windowStart.toLocaleDateString('ko-KR', { month: '2-digit', day: '2-digit' })} 개발 로그`;

  console.log(`Window: ${fmtISO(windowStart)} ~ ${fmtISO(windowEnd)}`);

  const gitLog = getGitLog(windowStart, windowEnd);
  const diffSummary = getDiff(windowStart, windowEnd);

  console.log('Git log:\n', gitLog);
  console.log('Generating AI summary...');

  let ai;
  try {
    ai = await generateSummaryAndTodo(gitLog, diffSummary, dateLabel);
  } catch (err) {
    console.error('AI generation failed:', err.message);
    // fallback
    ai = {
      summary: `${dateLabel} 개발 작업 완료.\n\n[커밋]\n${gitLog}`,
      todos: [
        { priority: '🔴 높음', task: '오늘 작업 코드 검토', reason: 'AI 요약 실패 — 수동 확인 필요' },
      ],
    };
  }

  console.log('Creating Notion page...');

  const blocks = [
    callout(ai.summary, '🛠️'),
    divider(),
    heading(2, '📋 내일 할 일 (우선순위)'),
    ...ai.todos.map(t =>
      todoBlock(`${t.priority}  ${t.task}  —  ${t.reason}`)
    ),
    divider(),
    heading(2, '🗂 커밋 로그'),
    codeBlock(gitLog),
  ];

  if (diffSummary) {
    blocks.push(heading(3, '변경 파일'));
    blocks.push(codeBlock(diffSummary));
  }

  await notion.pages.create({
    parent: { page_id: NOTION_PAGE_ID },
    icon: { type: 'emoji', emoji: '📅' },
    properties: {
      title: { title: richText(pageTitle) },
    },
    children: blocks,
  });

  console.log(`✅ Notion page created: ${pageTitle}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
