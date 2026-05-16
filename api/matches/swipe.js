import { loadProfile, saveProfile, verifyToken } from '../_lib/auth.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const { myId, myToken, targetId, action } = req.body || {};
  if (!targetId || !['like', 'pass'].includes(action)) {
    return res.status(400).json({ error: 'INVALID_INPUT' });
  }

  const me = await loadProfile(myId);
  if (!me) return res.status(404).json({ error: 'PROFILE_NOT_FOUND' });
  if (!verifyToken(me, myToken)) return res.status(403).json({ error: 'INVALID_TOKEN' });
  if (targetId === me.id) return res.status(400).json({ error: 'SELF_SWIPE' });

  me.givenLikes = me.givenLikes || [];
  me.givenPasses = me.givenPasses || [];
  me.matches = me.matches || [];

  if (action === 'pass') {
    if (!me.givenPasses.includes(targetId) && !me.givenLikes.includes(targetId)) {
      me.givenPasses.push(targetId);
    }
    await saveProfile(me);
    return res.status(200).json({ matched: false });
  }

  // action === 'like'
  if (!me.givenLikes.includes(targetId)) me.givenLikes.push(targetId);

  const target = await loadProfile(targetId);
  if (!target) {
    await saveProfile(me);
    return res.status(200).json({ matched: false });
  }

  const targetLikedMe = (target.givenLikes || []).includes(me.id);

  if (targetLikedMe) {
    const matchedAt = new Date().toISOString();
    if (!me.matches.some((m) => m.withId === target.id)) {
      me.matches.push({ withId: target.id, matchedAt });
    }
    target.matches = target.matches || [];
    if (!target.matches.some((m) => m.withId === me.id)) {
      target.matches.push({ withId: me.id, matchedAt });
    }
    await Promise.all([saveProfile(me), saveProfile(target)]);
    return res.status(200).json({
      matched: true,
      match: {
        id: target.id,
        nickname: target.nickname,
        photoUrl: target.photoUrl,
        contactMethod: target.contactMethod,
        contact: target.contact,
      },
    });
  }

  await saveProfile(me);
  return res.status(200).json({ matched: false });
}
