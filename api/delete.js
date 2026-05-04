import { list, del, put } from '@vercel/blob';
import crypto from 'crypto';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const { id, deleteToken } = req.body || {};
  if (!id || !deleteToken) {
    return res.status(400).json({ error: 'id and deleteToken required' });
  }

  const { blobs: profileBlobs } = await list({ prefix: `profiles/${id}/profile.json`, limit: 1 });
  if (!profileBlobs.length) {
    return res.status(404).json({ error: 'NOT_FOUND', message: '등록 정보를 찾을 수 없습니다.' });
  }

  const profileRes = await fetch(profileBlobs[0].url);
  const profile = await profileRes.json();

  const tokenHash = crypto.createHash('sha256').update(deleteToken).digest('hex');
  if (!crypto.timingSafeEqual(Buffer.from(tokenHash, 'hex'), Buffer.from(profile.deleteTokenHash, 'hex'))) {
    return res.status(403).json({ error: 'INVALID_TOKEN', message: '삭제 권한이 없습니다.' });
  }

  const { blobs: allBlobs } = await list({ prefix: `profiles/${id}/` });
  await Promise.all(allBlobs.map((b) => del(b.url)));

  // Remove from index
  try {
    const { blobs: idxBlobs } = await list({ prefix: 'db/profiles-index.json', limit: 1 });
    if (idxBlobs.length) {
      const r = await fetch(idxBlobs[0].url);
      let index = await r.json();
      index = index.filter((e) => e.id !== id);
      await put('db/profiles-index.json', JSON.stringify(index), { access: 'public', allowOverwrite: true });
    }
  } catch {}

  return res.status(200).json({ message: '등록 정보와 사진이 삭제되었습니다.' });
}
