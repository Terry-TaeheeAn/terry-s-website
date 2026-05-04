import { list } from '@vercel/blob';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method !== 'GET') return res.status(405).end();

  const { id } = req.query;
  if (!id) return res.status(400).json({ error: 'id required' });

  const { blobs } = await list({ prefix: `profiles/${id}/profile.json`, limit: 1 });
  if (!blobs.length) {
    return res.status(404).json({ error: 'NOT_FOUND', message: '등록 정보를 찾을 수 없습니다.' });
  }

  const r = await fetch(blobs[0].url);
  const profile = await r.json();

  // Return only non-sensitive fields
  return res.status(200).json({
    id: profile.id,
    nickname: profile.nickname,
    gender: profile.gender,
    ageBand: profile.ageBand,
    city: profile.city,
    score: profile.score,
    percentile: profile.percentile,
    contactMethod: profile.contactMethod,
    createdAt: profile.createdAt,
    status: 'registered',
    message: '사전등록이 완료된 상태입니다. 정식 오픈 후 조건이 맞는 상대가 생기면 선택한 방법으로 알려드릴게요.',
  });
}
