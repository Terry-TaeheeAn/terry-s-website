import { loadProfile, verifyToken, loadIndex, AGE_ORDER } from '../_lib/auth.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const { myId, myToken, ageRange = 2, limit = 10 } = req.body || {};
  const me = await loadProfile(myId);
  if (!me) return res.status(404).json({ error: 'PROFILE_NOT_FOUND' });
  if (!verifyToken(me, myToken)) return res.status(403).json({ error: 'INVALID_TOKEN' });

  const index = await loadIndex();
  const swiped = new Set([...(me.givenLikes || []), ...(me.givenPasses || []), me.id]);
  const myAgeIdx = AGE_ORDER.indexOf(me.ageBand);

  // Filter candidates
  const candidates = index.filter((p) => {
    if (swiped.has(p.id)) return false;
    if (!p.gender || p.gender === me.gender) return false;
    if (myAgeIdx >= 0 && p.ageBand) {
      const idx = AGE_ORDER.indexOf(p.ageBand);
      if (idx >= 0 && Math.abs(idx - myAgeIdx) > ageRange) return false;
    }
    return true;
  });

  // Compatibility score using my priority sliders
  const pa = (me.priorityAppearance ?? 25) / 100;
  const ph = (me.priorityHeight ?? 25) / 100;
  const pw = (me.priorityWealth ?? 25) / 100;
  const pc = (me.priorityCareer ?? 25) / 100;

  const heightFromBand = (band) => {
    const map = {
      '150s': 40, '160_early': 50, '160_late': 62,
      '170_early': 72, '170_late': 82, '180+': 92,
      'private': 60,
    };
    return map[band] ?? 60;
  };

  const ranked = candidates.map((p) => {
    const appearance = p.appearanceScore || 0;
    const charm = p.charmScore || 0;
    const heightSig = heightFromBand(p.heightBand);
    // Career/wealth signals are embedded in charm but we approximate split:
    const wealthSig = charm; // dominated by income/asset (55%)
    const careerSig = charm; // education+job (35%)

    const compatibility =
      appearance * pa +
      heightSig  * ph +
      wealthSig  * pw +
      careerSig  * pc;

    return { p, compatibility };
  });

  ranked.sort((a, b) => b.compatibility - a.compatibility);
  const top = ranked.slice(0, limit).map(({ p, compatibility }) => ({
    id: p.id,
    nickname: p.nickname,
    ageBand: p.ageBand,
    city: p.city,
    heightBand: p.heightBand,
    photoUrl: p.photoUrl,
    appearanceScore: p.appearanceScore,
    charmGrade: gradeFor(p.charmScore),
    compatibility: Math.round(compatibility),
  }));

  return res.status(200).json({ candidates: top });
}

function gradeFor(score) {
  if (!score) return 'D';
  if (score >= 85) return 'S';
  if (score >= 75) return 'A';
  if (score >= 65) return 'B';
  if (score >= 55) return 'C';
  return 'D';
}
