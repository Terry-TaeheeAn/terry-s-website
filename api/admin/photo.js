import { list } from '@vercel/blob';
import crypto from 'crypto';

function requireAdmin(req, res) {
  const secret = req.headers['x-admin-secret'] || req.query.s;
  if (!process.env.ADMIN_SECRET || secret !== process.env.ADMIN_SECRET) {
    res.status(401).json({ error: 'Unauthorized' });
    return false;
  }
  return true;
}

// Generate a 10-min signed URL for a profile photo (proxied through this endpoint)
function signPhotoAccess(id) {
  const expires = Date.now() + 10 * 60 * 1000;
  const sig = crypto
    .createHmac('sha256', process.env.PHOTO_URL_SECRET || 'fallback-secret')
    .update(`${id}:${expires}`)
    .digest('hex');
  return { expires, sig };
}

function verifySignature(id, expires, sig) {
  if (Date.now() > Number(expires)) return false;
  const expected = crypto
    .createHmac('sha256', process.env.PHOTO_URL_SECRET || 'fallback-secret')
    .update(`${id}:${expires}`)
    .digest('hex');
  try {
    return crypto.timingSafeEqual(Buffer.from(sig, 'hex'), Buffer.from(expected, 'hex'));
  } catch {
    return false;
  }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-admin-secret');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { id, action, expires, sig } = req.query;
  if (!id) return res.status(400).json({ error: 'id required' });

  // Two modes:
  // 1. action=sign  → admin auth required, returns signed URL
  // 2. (default)    → sig+expires required, serves the image
  if (action === 'sign') {
    if (!requireAdmin(req, res)) return;
    const signed = signPhotoAccess(id);
    const base = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '';
    return res.status(200).json({
      url: `${base}/api/admin/photo?id=${id}&expires=${signed.expires}&sig=${signed.sig}`,
      expiresAt: new Date(signed.expires).toISOString(),
    });
  }

  // Serve photo using signed params
  if (!expires || !sig || !verifySignature(id, expires, sig)) {
    return res.status(403).json({ error: 'Invalid or expired link' });
  }

  const { blobs: profileBlobs } = await list({ prefix: `profiles/${id}/profile.json`, limit: 1 });
  if (!profileBlobs.length) return res.status(404).end();

  const r = await fetch(profileBlobs[0].url);
  const profile = await r.json();
  if (!profile.photoUrl) return res.status(404).end();

  const photoRes = await fetch(profile.photoUrl);
  if (!photoRes.ok) return res.status(404).end();

  const buf = await photoRes.arrayBuffer();
  res.setHeader('Content-Type', photoRes.headers.get('content-type') || 'image/jpeg');
  res.setHeader('Cache-Control', 'private, no-store');
  return res.send(Buffer.from(buf));
}
