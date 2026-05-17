import Anthropic from '@anthropic-ai/sdk';
import { put, list } from '@vercel/blob';

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
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

  const base64 = image.replace(/^data:image\/\w+;base64,/, '');

  const globalCount = await getGlobalCount();
  if (globalCount >= GLOBAL_LIMIT) {
    return res.status(429).json({ error: 'GLOBAL_LIMIT_REACHED', message: '전체 이용 횟수가 초과되었습니다. 서비스 운영자에게 문의해주세요.' });
  }

  await setGlobalCount(globalCount + 1);

  try {
    const message = await anthropic.messages.create({
      model: process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-6',
      max_tokens: 1500,
      tools: [
        {
          name: 'charm_analysis',
          description: '소개팅 프로필 사진 매력도 분석 결과를 구조화된 형태로 반환',
          input_schema: ANALYSIS_SCHEMA,
        },
      ],
      tool_choice: { type: 'tool', name: 'charm_analysis' },
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: 'image/jpeg',
                data: base64,
              },
            },
            { type: 'text', text: ANALYSIS_PROMPT },
          ],
        },
      ],
    });

    const toolUse = message.content.find((b) => b.type === 'tool_use');
    if (!toolUse) throw new Error('no tool_use block');

    const raw = toolUse.input;
    const { breakdown } = raw;
    const score = Math.min(
      100,
      breakdown.firstImpression +
        breakdown.eyeExpression +
        breakdown.facialBalance +
        breakdown.styleGrooming +
        breakdown.photoQuality +
        breakdown.vibeAura
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
    console.error('Claude error:', err);
    return res.status(500).json({ error: 'ANALYSIS_FAILED', message: '분석 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' });
  }
}

const ANALYSIS_PROMPT = `당신은 소개팅 앱 프로필 사진 매력도 분석 AI입니다.
이 서비스는 순수 엔터테인먼트/바이럴 목적의 재미 콘텐츠입니다.

소개팅 앱 프로필 사진으로서의 매력도를 다음 6개 항목으로 세밀하게 채점해주세요:

- firstImpression (0~25점): 소개팅 상대로서의 첫인상, 전반적 호감도와 인상의 강도
- eyeExpression (0~20점): 눈빛의 생동감·깊이, 표정의 자연스러움과 밝음, 미소의 매력
- facialBalance (0~15점): 이목구비 배치의 균형감, 얼굴 윤곽과 조화, 전체적인 얼굴 구성
- styleGrooming (0~20점): 헤어스타일, 패션 센스, 관리 상태, 전체적인 스타일링 완성도
- photoQuality (0~10점): 조명 선택, 구도와 앵글, 배경, 사진 해상도와 선명도
- vibeAura (0~10점): 사진에서 느껴지는 분위기·아우라, 소개팅 설렘을 주는 무형의 매력

⚠️ 절대 금지사항:
- 외모를 직접 비하하는 표현 (못생김, 뚱뚱함, 피부 문제, 여드름 등 직접 언급 금지)
- 특정 연예인과의 비교
- 인종, 체형에 대한 직접 언급
- 나이를 비하하는 표현

✅ 대신 이런 표현을 사용:
- 사진 품질/구도 문제 → "사진 컨디션", "조명 선택", "각도"로 표현
- 스타일 개선 → "프로필 사진 연출", "스타일링"으로 표현
- 피부 → 절대 언급하지 않음

점수 기준 (합산 100점 만점):
- 40점 이하: 사진 조건이 많이 아쉬운 경우
- 41~60점: 평균적인 프로필
- 61~75점: 눈에 띄는 매력
- 76~89점: 상위권 매력
- 90점 이상: 최상위권 (매우 드물게만 부여)

모든 문구는 한국어로, 친한 친구가 솔직하지만 따뜻하게 말해주는 톤으로 작성해주세요.
재미있고 위트 있되, 절대 상처를 주지 않도록 해주세요.
oneLiner는 소개팅 감성으로 시적이고 인상적으로 작성해주세요.`;

const ANALYSIS_SCHEMA = {
  type: 'object',
  properties: {
    breakdown: {
      type: 'object',
      properties: {
        firstImpression: { type: 'integer', description: '첫인상 & 호감도 (0~25)' },
        eyeExpression: { type: 'integer', description: '눈빛 & 표정 (0~20)' },
        facialBalance: { type: 'integer', description: '이목구비 균형 (0~15)' },
        styleGrooming: { type: 'integer', description: '스타일 & 그루밍 (0~20)' },
        photoQuality: { type: 'integer', description: '사진 품질 (0~10)' },
        vibeAura: { type: 'integer', description: '분위기 & 아우라 (0~10)' },
      },
      required: ['firstImpression', 'eyeExpression', 'facialBalance', 'styleGrooming', 'photoQuality', 'vibeAura'],
    },
    oneLiner: { type: 'string', description: '소개팅 감성 한 줄 평가' },
    summary: { type: 'string', description: '전반적 분석 요약 (3~5문장)' },
    confessionCount: { type: 'string', description: 'AI 예측 고백받은 횟수' },
    relationshipExp: { type: 'string', description: 'AI 예측 연애 경험' },
    estimatedAge: { type: 'string', description: 'AI 예측 나이대' },
    personalityType: { type: 'string', description: '사진으로 본 연애 캐릭터' },
    dateScene: { type: 'string', description: '어울리는 첫 데이트 장소' },
    stylePrediction: { type: 'string', description: '스타일 예측' },
    friendReaction: { type: 'string', description: '소개팅 후 친구들 반응 예측' },
    tags: { type: 'array', items: { type: 'string' }, description: '매력 키워드 태그 3~5개' },
    advice: { type: 'string', description: '프로필 사진 개선 팁' },
    eyeDetail: { type: 'string', description: '눈빛·표정 세부 분석' },
    styleDetail: { type: 'string', description: '스타일·그루밍 세부 분석' },
    vibeDetail: { type: 'string', description: '분위기·아우라 세부 분석' },
  },
  required: [
    'breakdown', 'oneLiner', 'summary', 'confessionCount', 'relationshipExp',
    'estimatedAge', 'personalityType', 'dateScene', 'stylePrediction',
    'friendReaction', 'tags', 'advice', 'eyeDetail', 'styleDetail', 'vibeDetail',
  ],
};
