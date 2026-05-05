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

  // Non-blocking — don't fail analysis if blob write fails
  setGlobalCount(globalCount + 1).catch(() => {});

  try {
    const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';
    const completion = await openai.chat.completions.create({
      model,
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
      response_format: { type: 'json_object' },
      max_tokens: 1200,
    });

    let raw;
    try {
      raw = JSON.parse(completion.choices[0].message.content);
    } catch {
      console.error('JSON parse failed:', completion.choices[0].message.content);
      return res.status(500).json({ error: 'PARSE_FAILED', message: '분석 결과를 읽는 중 오류가 발생했습니다. 다시 시도해주세요.' });
    }

    // Validate breakdown exists
    if (!raw.breakdown || typeof raw.breakdown.firstImpression !== 'number') {
      return res.status(500).json({ error: 'INVALID_RESPONSE', message: '분석 결과 형식이 잘못되었습니다. 다시 시도해주세요.' });
    }

    const { breakdown } = raw;
    const score = Math.min(
      100,
      (breakdown.firstImpression || 0) + (breakdown.expression || 0) + (breakdown.photoCondition || 0) + (breakdown.stylePresence || 0) + (breakdown.datingProfileFit || 0)
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

소개팅 앱 프로필 사진으로서의 매력도를 다음 항목별로 채점하고, 반드시 아래 JSON 형식으로만 응답해주세요.

점수 항목:
- firstImpression (0~35점): 소개팅 상대로서의 첫인상, 호감도, 인상의 강도
- expression (0~20점): 표정의 자연스러움, 밝음, 친근감
- photoCondition (0~15점): 사진 품질, 조명, 구도, 배경
- stylePresence (0~15점): 스타일, 관리감, 전체적인 분위기
- datingProfileFit (0~15점): 소개팅 프로필 사진으로서의 적합도와 완성도

⚠️ 절대 금지: 못생김/뚱뚱함/피부 문제/여드름 등 직접 비하 표현, 연예인 비교, 인종·체형 직접 언급
✅ 대신: "사진 컨디션", "조명 선택", "각도", "스타일링" 등으로 표현

점수 기준: 40점↓아쉬움 / 41~60평균 / 61~75눈에띔 / 76~89상위권 / 90+최상위(극히드물게)

모든 문구는 한국어로, 친한 친구가 솔직하지만 따뜻하게 말하는 톤으로 작성해주세요.

반드시 다음 JSON 형식으로만 응답:
{
  "breakdown": {
    "firstImpression": 숫자,
    "expression": 숫자,
    "photoCondition": 숫자,
    "stylePresence": 숫자,
    "datingProfileFit": 숫자
  },
  "oneLiner": "소개팅 감성의 시적인 한줄평 (예: 벚꽃 같이 보고 싶은 사람)",
  "summary": "2~3문장 매력 요약",
  "confessionCount": "고백받은 횟수 예측 (예: 7~12번)",
  "relationshipExp": "연애 경험 예측",
  "estimatedAge": "나이 예측 (예: 25~29세)",
  "personalityType": "연애 캐릭터 타입",
  "dateScene": "어울리는 첫 데이트 장면",
  "stylePrediction": "스타일 예측",
  "friendReaction": "친구들 반응 예측",
  "tags": ["태그1", "태그2", "태그3"],
  "advice": "사진 개선 팁 (긍정적으로)"
}`;

