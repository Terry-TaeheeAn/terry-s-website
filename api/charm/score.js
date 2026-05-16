// 매력점수(0~100) 산출 API
// 입력: { spec: { income, asset, education, jobCategory, height }, gender }
// 출력: { charmScore, breakdown }
//
// 환산표/가중치는 서버사이드에서만 적용해 사용자가 점수를 부풀리지 못하게 한다.

const INCOME = {
  'under-3000':    30,
  '3000-5000':     50,
  '5000-7000':     65,
  '7000-10000':    78,
  '10000-15000':   88,
  '15000-30000':   94,
  '30000+':        99,
};

const ASSET = {
  'under-5000':    30,
  '5000-10000':    45,
  '10000-30000':   60,
  '30000-50000':   72,
  '50000-100000':  84,
  '100000-300000': 92,
  '300000+':       99,
};

const EDUCATION = {
  'sky-med':       95, // SKY · 의치한약수
  'inseoul-top':   82, // 서성한·중경외시
  'inseoul':       72, // 인서울 전반
  'national':      63, // 지방거점국립
  'regional':      55, // 그 외 4년제
  'college':       48, // 전문대
  'highschool':    40, // 고졸
  'other':         45,
};

const JOB = {
  'professional':  95, // 전문직 (의·변·회·세 등)
  'public':        88, // 공기업·공무원
  'large-corp':    85, // 대기업·외국계 본사
  'mid-corp':      72, // 중견기업
  'small-corp':    58, // 중소기업
  'startup':       62, // 스타트업
  'freelance':     58, // 프리랜서
  'business':      70, // 자영업·사업가
  'student':       55, // 학생·대학원생
  'other':         45,
};

// 키 환산 (성별별 분포 반영)
function heightScore(h, gender) {
  const cm = parseInt(h);
  if (!cm) return 50;
  if (gender === 'M') {
    if (cm >= 185) return 98;
    if (cm >= 182) return 94;
    if (cm >= 180) return 90;
    if (cm >= 178) return 84;
    if (cm >= 175) return 75;
    if (cm >= 172) return 65;
    if (cm >= 170) return 58;
    if (cm >= 168) return 50;
    if (cm >= 165) return 42;
    return 35;
  } else {
    if (cm >= 172) return 96;
    if (cm >= 170) return 92;
    if (cm >= 168) return 88;
    if (cm >= 165) return 80;
    if (cm >= 163) return 72;
    if (cm >= 160) return 65;
    if (cm >= 158) return 58;
    if (cm >= 155) return 50;
    return 42;
  }
}

const WEIGHTS = {
  income:    0.30,
  asset:     0.25,
  education: 0.20,
  job:       0.15,
  height:    0.10,
};

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const { spec, gender } = req.body || {};
  if (!spec) return res.status(400).json({ error: 'spec required' });

  const incomeScore    = INCOME[spec.income]      ?? 40;
  const assetScore     = ASSET[spec.asset]        ?? 40;
  const educationScore = EDUCATION[spec.education] ?? 50;
  const jobScore       = JOB[spec.jobCategory]    ?? 50;
  const hScore         = heightScore(spec.height, gender);

  const charmScore = Math.round(
    incomeScore    * WEIGHTS.income +
    assetScore     * WEIGHTS.asset +
    educationScore * WEIGHTS.education +
    jobScore       * WEIGHTS.job +
    hScore         * WEIGHTS.height
  );

  // 백분위 근사 (charmScore 분포 가정: 평균 60, 표준편차 18)
  const z = (charmScore - 60) / 18;
  const percentile = Math.max(1, Math.min(99, Math.round(100 - (50 + 50 * erf(z / Math.SQRT2)))));

  // 등급
  let grade = 'D';
  if (charmScore >= 85) grade = 'S';
  else if (charmScore >= 75) grade = 'A';
  else if (charmScore >= 65) grade = 'B';
  else if (charmScore >= 55) grade = 'C';

  return res.status(200).json({
    charmScore,
    percentile,
    grade,
    breakdown: {
      income:    incomeScore,
      asset:     assetScore,
      education: educationScore,
      job:       jobScore,
      height:    hScore,
    },
  });
}

function erf(x) {
  const sign = x >= 0 ? 1 : -1;
  x = Math.abs(x);
  const a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741;
  const a4 = -1.453152027, a5 = 1.061405429, p = 0.3275911;
  const t = 1.0 / (1.0 + p * x);
  const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
  return sign * y;
}
