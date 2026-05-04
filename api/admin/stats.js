import { list } from '@vercel/blob';

function requireAdmin(req, res) {
  const secret = req.headers['x-admin-secret'] || req.query.s;
  if (!process.env.ADMIN_SECRET || secret !== process.env.ADMIN_SECRET) {
    res.status(401).json({ error: 'Unauthorized' });
    return false;
  }
  return true;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-admin-secret');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (!requireAdmin(req, res)) return;

  let index = [];
  try {
    const { blobs } = await list({ prefix: 'db/profiles-index.json', limit: 1 });
    if (blobs.length) {
      const r = await fetch(blobs[0].url);
      index = await r.json();
    }
  } catch {}

  let rateCount = 0;
  try {
    const { blobs } = await list({ prefix: 'db/rate-limits.json', limit: 1 });
    if (blobs.length) {
      const r = await fetch(blobs[0].url);
      const d = await r.json();
      rateCount = d.analyzeCount || 0;
    }
  } catch {}

  const total = index.length;
  const avgScore = total ? Math.round(index.reduce((s, e) => s + (e.score || 0), 0) / total) : 0;

  const genderCount = {};
  const cityCount = {};
  for (const e of index) {
    if (e.gender) genderCount[e.gender] = (genderCount[e.gender] || 0) + 1;
    if (e.city) cityCount[e.city] = (cityCount[e.city] || 0) + 1;
  }

  return res.status(200).json({
    total,
    remaining: Math.max(0, 20 - total),
    avgScore,
    analyzeCount: rateCount,
    genderStats: genderCount,
    cityStats: cityCount,
  });
}
