import { loadProfile, verifyToken } from '../_lib/auth.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const { myId, myToken } = req.body || {};
  const me = await loadProfile(myId);
  if (!me) return res.status(404).json({ error: 'PROFILE_NOT_FOUND' });
  if (!verifyToken(me, myToken)) return res.status(403).json({ error: 'INVALID_TOKEN' });

  const matches = me.matches || [];
  const enriched = await Promise.all(
    matches.map(async (m) => {
      const p = await loadProfile(m.withId);
      if (!p) return null;
      return {
        id: p.id,
        nickname: p.nickname,
        photoUrl: p.photoUrl,
        city: p.city,
        ageBand: p.ageBand,
        contactMethod: p.contactMethod,
        contact: p.contact,
        matchedAt: m.matchedAt,
      };
    })
  );

  return res.status(200).json({ matches: enriched.filter(Boolean) });
}
