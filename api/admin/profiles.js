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

  const { search = '', page = '1', limit = '20' } = req.query;
  const pageNum = Math.max(1, parseInt(page));
  const limitNum = Math.min(100, Math.max(1, parseInt(limit)));

  // Load all profile JSONs
  const { blobs: profileBlobs } = await list({ prefix: 'profiles/', limit: 1000 });
  const profileJsonBlobs = profileBlobs.filter((b) => b.pathname.endsWith('/profile.json'));

  const profiles = await Promise.all(
    profileJsonBlobs.map(async (b) => {
      try {
        const r = await fetch(b.url);
        return await r.json();
      } catch {
        return null;
      }
    })
  );

  let filtered = profiles.filter(Boolean);

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        (p.nickname || '').toLowerCase().includes(q) ||
        (p.city || '').toLowerCase().includes(q) ||
        (p.job || '').toLowerCase().includes(q)
    );
  }

  filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const total = filtered.length;
  const start = (pageNum - 1) * limitNum;
  const items = filtered.slice(start, start + limitNum).map((p) => ({
    ...p,
    deleteTokenHash: undefined,
    contact: p.contact ? maskContact(p.contact) : '',
    photoUrl: p.photoUrl || null,
  }));

  return res.status(200).json({ total, page: pageNum, items });
}

function maskContact(c) {
  if (!c) return '';
  if (c.length <= 4) return '****';
  return c.slice(0, 2) + '*'.repeat(c.length - 4) + c.slice(-2);
}
