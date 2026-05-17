#!/usr/bin/env node
/**
 * Daily Notion dev log uploader (4am KST window)
 *
 * Config: scripts/notion-config.json (page IDs, not secrets)
 * Secrets needed (GitHub): ANTHROPIC_API_KEY, NOTION_TOKEN
 *
 * notion-config.json shape:
 * {
 *   "projects": [
 *     { "name": "AI 데이팅앱", "pageId": "xxx", "repoPath": "." }
 *   ]
 * }
 */

import { execSync } from 'child_process';
import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import Anthropic from '@anthropic-ai/sdk';
import { Client } from '@notionhq/client';

const __dir = dirname(fileURLToPath(import.meta.url));
const CONFIG_PATH = resolve(__dir, 'notion-config.json');

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const notion = new Client({ auth: process.env.NOTION_TOKEN });

// ── Config ─────────────────────────────────────────────────────────────────────
function loadConfig() {
  // legacy: single page via env var (backward compat)
  if (!existsSync(CONFIG_PATH) && process.env.NOTION_PAGE_ID) {
    return {
      projects: [
        { name: 'AI 데이팅앱', pageId: process.env.NOTION_PAGE_ID, repoPath: '.' },
      ],
    };
  }
  return JSON.parse(readFileSync(CONFIG_PATH, 'utf-8'));
}

// ── Time window ────────────────────────────────────────────────────────────────
function getWindow() {
  const now = new Date();
  const todayFour = new Date(now);
  todayFour.setHours(4, 0, 0, 0);
  const windowEnd = todayFour;
  const windowStart = new Date(windowEnd.getTime() - 24 * 60 * 60 * 1000);
  return { windowStart, windowEnd };
}

function fmtISO(d) {
  return d.toISOString().replace('T', ' ').slice(0, 16);
}

// ── Git log ────────────────────────────────────────────────────────────────────
function getGitLog(since, until, cwd) {
  try {
    return execSync(
      `git log --since="${fmtISO(since)}" --until="${fmtISO(until)}" --pretty=format:"%h %s (%an, %ar)" --date=local`,
      { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'pipe'], cwd }
    ).trim() || '(커밋 없음)';
  } catch {
    return '(git log 실패)';
  }
}

function getDiff(since, until, cwd) {
  try {
    const firstHash = execSync(
      `git log --since="${fmtISO(since)}" --until="${fmtISO(until)}" --pretty=format:"%H" | tail -1`,
      { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'pipe'], cwd, shell: true }
    ).trim();
    if (!firstHash) return '';
    return execSync(
      `git diff --stat ${firstHash}^..HEAD`,
      { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'pipe'], cwd }
    ).trim().slice(0, 1500);
  } catch {
    return '';
  }
}

// ── Claude summary + todo (Haiku — fast & cheap) ───────────────────────────────
async function generateSummaryAndTodo(projectName, gitLog, diffSummary, dateLabel) {
  const prompt = `
프로젝트: ${projectName}
날짜: ${dateLabel}

[커밋 로그]
${gitLog}

[변경 파일 요약]
${diffSummary || '(없음)'}

다음 두 가지를 JSON으로 반환해주세요:
1. summary: 오늘 무엇을 했는지 2~4 문장 요약 (한국어, 개발자 노트 스타일)
2. todos: 내일 해야 할 것들. 각 항목은 { priority: "🔴 높음" | "🟡 중간" | "🟢 낮음", task: string, reason: string } 형태. 4~7개.

JSON만 반환. 마크다운 코드블록 없이.`.trim();

  const msg = await anthropic.messages.create({
    model: 'claude-haiku-4-5-20251001',  // ~100x cheaper than Opus, ~$0.001/day
    max_tokens: 1024,
    messages: [{ role: 'user', content: prompt }],
  });

  return JSON.parse(msg.content[0].text.trim());
}

// ── Notion block helpers ───────────────────────────────────────────────────────
const richText = (s) => [{ type: 'text', text: { content: String(s || '') } }];

const heading = (level, text) => ({
  object: 'block', type: `heading_${level}`,
  [`heading_${level}`]: { rich_text: richText(text) },
});

const callout = (text, emoji) => ({
  object: 'block', type: 'callout',
  callout: { rich_text: richText(text), icon: { type: 'emoji', emoji }, color: 'default' },
});

const divider = () => ({ object: 'block', type: 'divider', divider: {} });

const todoBlock = (text) => ({
  object: 'block', type: 'to_do',
  to_do: { rich_text: richText(text), checked: false },
});

const codeBlock = (text) => ({
  object: 'block', type: 'code',
  code: { rich_text: richText(text), language: 'plain text' },
});

// ── Process one project ────────────────────────────────────────────────────────
async function processProject(project, windowStart, windowEnd) {
  const { name, pageId, repoPath } = project;
  const cwd = resolve(repoPath);

  const dateLabel = windowStart.toLocaleDateString('ko-KR', {
    year: 'numeric', month: 'long', day: 'numeric', weekday: 'long',
  });
  const pageTitle = `📅 ${windowStart.toLocaleDateString('ko-KR', { month: '2-digit', day: '2-digit' })} 개발 로그`;

  console.log(`\n[${name}] Processing...`);

  const gitLog = getGitLog(windowStart, windowEnd, cwd);
  const diffSummary = getDiff(windowStart, windowEnd, cwd);

  let ai;
  try {
    ai = await generateSummaryAndTodo(name, gitLog, diffSummary, dateLabel);
  } catch (err) {
    console.error(`[${name}] AI failed:`, err.message);
    ai = {
      summary: `${dateLabel} 개발 작업.\n\n${gitLog}`,
      todos: [{ priority: '🔴 높음', task: '오늘 작업 검토', reason: 'AI 요약 실패 — 수동 확인 필요' }],
    };
  }

  const blocks = [
    callout(ai.summary, '🛠️'),
    divider(),
    heading(2, '📋 내일 할 일 (우선순위)'),
    ...ai.todos.map(t => todoBlock(`${t.priority}  ${t.task}  —  ${t.reason}`)),
    divider(),
    heading(2, '🗂 커밋 로그'),
    codeBlock(gitLog),
    ...(diffSummary ? [heading(3, '변경 파일'), codeBlock(diffSummary)] : []),
  ];

  await notion.pages.create({
    parent: { page_id: pageId },
    icon: { type: 'emoji', emoji: '📅' },
    properties: { title: { title: richText(pageTitle) } },
    children: blocks,
  });

  console.log(`[${name}] ✅ Created: ${pageTitle}`);
}

// ── Main ───────────────────────────────────────────────────────────────────────
async function main() {
  const config = loadConfig();
  const { windowStart, windowEnd } = getWindow();

  console.log(`Window: ${fmtISO(windowStart)} ~ ${fmtISO(windowEnd)}`);
  console.log(`Projects: ${config.projects.map(p => p.name).join(', ')}`);

  for (const project of config.projects) {
    await processProject(project, windowStart, windowEnd);
  }

  console.log('\n✅ All projects done.');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
