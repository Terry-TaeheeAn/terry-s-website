import { put, list } from '@vercel/blob';
import crypto from 'crypto';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const { photo, profile } = req.body || {};

  if (!profile?.nickname || !profile?.gender || !profile?.contactMethod || !profile?.contact) {
    return res.status(400).json({ error: 'MISSING_FIELDS', message: '필수 항목이 누락되었습니다.' });
  }
  if (!profile?.consentData) {
    return res.status(400).json({ error: 'CONSENT_REQUIRED', message: '개인정보 수집·이용 동의가 필요합니다.' });
  }

  const id = crypto.randomUUID();
  const deleteToken = crypto.randomBytes(32).toString('hex');
  const deleteTokenHash = crypto.createHash('sha256').update(deleteToken).digest('hex');

  let photoUrl = null;
  if (photo) {
    const base64 = photo.replace(/^data:image\/\w+;base64,/, '');
    const buf = Buffer.from(base64, 'base64');
    const blob = await put(`profiles/${id}/photos/primary`, buf, {
      access: 'public',
      contentType: 'image/jpeg',
      allowOverwrite: true,
    });
    photoUrl = blob.url;
  }

  const appearanceScore = Number(profile.appearanceScore || profile.score || 0);
  const charmScore = Number(profile.charmScore || 0);
  const totalScore = Math.round(appearanceScore * 0.5 + charmScore * 0.5);

  const profileData = {
    id,
    nickname: profile.nickname,
    gender: profile.gender,
    ageBand: profile.ageBand || '',
    city: profile.city || '',
    job: profile.job || '',
    heightBand: profile.heightBand || '',
    contactMethod: profile.contactMethod,
    contact: profile.contact,

    // Legacy
    score: appearanceScore,
    percentile: profile.percentile || 0,

    // New scoring
    appearanceScore,
    charmScore,
    totalScore,
    charmGrade: profile.charmGrade || '',
    spec: profile.spec || null,

    personalityType: profile.personalityType || '',
    dateStyle: profile.dateStyle || '',
    balanceLooksHeight: profile.balanceLooksHeight || '',
    balanceCareerMoney: profile.balanceCareerMoney || '',
    balanceChemistryStability: profile.balanceChemistryStability || '',
    priorityAppearance: profile.priorityAppearance ?? 25,
    priorityHeight: profile.priorityHeight ?? 25,
    priorityWealth: profile.priorityWealth ?? 25,
    priorityCareer: profile.priorityCareer ?? 25,
    datingPersonality: profile.datingPersonality || '',
    firstDatePref: profile.firstDatePref || '',
    extraMemo: profile.extraMemo || '',
    consentData: true,
    consentNotification: profile.consentNotification || false,
    photoUrl,
    deleteTokenHash,

    // Matching state
    givenLikes: [],
    givenPasses: [],
    matches: [],

    createdAt: new Date().toISOString(),
  };

  await put(`profiles/${id}/profile.json`, JSON.stringify(profileData), {
    access: 'public',
    allowOverwrite: true,
  });

  await updateIndex({
    id,
    nickname: profile.nickname,
    gender: profile.gender,
    ageBand: profile.ageBand || '',
    city: profile.city || '',
    heightBand: profile.heightBand || '',
    appearanceScore,
    charmScore,
    totalScore,
    photoUrl,
    score: appearanceScore,
    percentile: profile.percentile || 0,
    createdAt: new Date().toISOString(),
  });

  return res.status(200).json({ id, deleteToken });
}

async function updateIndex(entry) {
  let index = [];
  try {
    const { blobs } = await list({ prefix: 'db/profiles-index.json', limit: 1 });
    if (blobs.length) {
      const r = await fetch(blobs[0].url);
      index = await r.json();
    }
  } catch {}
  index.push(entry);
  await put('db/profiles-index.json', JSON.stringify(index), {
    access: 'public',
    allowOverwrite: true,
  });
}
