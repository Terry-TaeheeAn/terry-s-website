import OpenAI from 'openai';
import { put, list } from '@vercel/blob';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const GLOBAL_LIMIT = 200;
const RATE_LIMIT_PATH = 'db/rate-limits.json';

async function getGlobalCount() {
  try {
    const { blobs } = await list({ prefix: RATE_LIMIT_PATH, limit: 1 });
    if (!blobs.length) return 0;
    const res = await fetch(blobs[0].url);
    const data = await res.json();
    return data.analyzeCount || 0;
  } catch {
    return 0;
  }
}

async function setGlobalCount(count) {
  await put(RATE_LIMIT_PATH, JSON.stringify({ analyzeCount: count, updatedAt: new Date().toISOString() }), {
    access: 'public',
    allowOverwrite: true,
  });
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const { image } = req.body || {};
  if (!image || typeof image !== 'string') {
    return res.status(400).json({ error: 'image required' });
  }

  // Strip data URL prefix if present
  const base64 = image.replace(/^data:image\/\w+;base64,/, '');

  const globalCount = await getGlobalCount();
  if (globalCount >= GLOBAL_LIMIT) {
    return res.status(429).json({ error: 'GLOBAL_LIMIT_REACHED', message: '전체 이용 횟수가 초과되었습니다. 서비스 운영자에게 문의해주세요.' });
  }

  await setGlobalCount(globalCount + 1);

  try {
    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4.1-mini',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image_url',
              image_url: { url: `data:image/jpeg;base64,${base64}`, detail: 'low' },
            },
            { type: 'text', text: ANALYSIS_PROMPT },
          ],
        },
      ],
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'charm_analysis',
          strict: true,
          schema: ANALYSIS_SCHEMA,
        },
      },
      max_tokens: 1200,
    });

    const raw = JSON.parse(completion.choices[0].message.content);
    const { breakdown } = raw;
    const score = Math.min(
      100,
      breakdown.firstImpression + breakdown.expression + breakdown.photoCondition + breakdown.stylePresence + breakdown.datingProfileFit
    );
    const rawPercentile = 100 - score;
    const percentile = Math.max(1, Math.min(99, rawPercentile + Math.floor(Math.random() * 5) - 2));

    return res.status(200).json({
      ...raw,
      score,
      percentile,
      globalRemaining: GLOBAL_LIMIT - globalCount - 1,
    });
  } catch (err) {
    console.error('OpenAI error:', err);
    return res.status(500).json({ error: 'ANALYSIS_FAILED', message: '분석 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' });
  }
}

const ANALYSIS_PROMPT = `당신은 소개팅 앱 프로필 사진 매력도 분석 AI입니다.
이 서비스는 순수 엔터테인먼트/바이럴 목적의 재미 콘텐츠입니다.

소개팅 앱 프로필 사진으로서의 매력도를 다음 항목별로 채점해주세요:

- firstImpression (0~35점): 소개팅 상대로서의 첫인상, 호감도, 인상의 강도
- expression (0~20점): 표정의 자연스러움, 밝음, 친근감
- photoCondition (0~15점): 사진 품질, 조명, 구도, 배경
- stylePresence (0~15점): 스타일, 관리감, 전체적인 분위기
- datingProfileFit (0~15점): 소개팅 프로필 사진으로서의 적합도와 완성도

⚠️ 절대 금지사항:
- 외모를 직접 비하하는 표현 (못생김, 뚱뚱함, 피부 문제, 여드름 등 직접 언급 금지)
- 특정 연예인과의 비교
- 인종, 체형에 대한 직접 언급
- 나이를 비하하는 표현

✅ 대신 이런 표현을 사용:
- 사진 품질/구도 문제 → "사진 컨디션", "조명 선택", "각도"로 표현
- 스타일 개선 → "프로필 사진 연출", "스타일링"으로 표현
- 피부 → 절대 언급하지 않음

점수 기준:
- 40점 이하: 사진 조건이 많이 아쉬운 경우
- 41~60점: 평균적인 프로필
- 61~75점: 눈에 띄는 매력
- 76~89점: 상위권 매력
- 90점 이상: 최상위권 (매우 드물게만 부여)

모든 문구는 한국어로, 마치 친한 친구가 솔직하지만 따뜻하게 말해주는 톤으로 작성해주세요.
재미있고 위트 있되, 절대 상처를 주지 않도록 해주세요.
oneLiner는 소개팅 감성으로 시적이고 인상적으로 작성해주세요.`;

const ANALYSIS_SCHEMA = {
  type: 'object',
  properties: {
    breakdown: {
      type: 'object',
      properties: {
        firstImpression: { type: 'integer' },
        expression: { type: 'integer' },
        photoCondition: { type: 'integer' },
        stylePresence: { type: 'integer' },
        datingProfileFit: { type: 'integer' },
      },
      required: ['firstImpression', 'expression', 'photoCondition', 'stylePresence', 'datingProfileFit'],
      additionalProperties: false,
    },
    oneLiner: { type: 'string' },
    summary: { type: 'string' },
    confessionCount: { type: 'string' },
    relationshipExp: { type: 'string' },
    estimatedAge: { type: 'string' },
    personalityType: { type: 'string' },
    dateScene: { type: 'string' },
    stylePrediction: { type: 'string' },
    friendReaction: { type: 'string' },
    tags: { type: 'array', items: { type: 'string' } },
    advice: { type: 'string' },
  },
  required: ['breakdown', 'oneLiner', 'summary', 'confessionCount', 'relationshipExp', 'estimatedAge', 'personalityType', 'dateScene', 'stylePrediction', 'friendReaction', 'tags', 'advice'],
  additionalProperties: false,
};
