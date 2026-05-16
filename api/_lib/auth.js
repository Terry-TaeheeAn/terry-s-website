import { list, put } from '@vercel/blob';
import crypto from 'crypto';

export async function loadProfile(id) {
  if (!id) return null;
  const { blobs } = await list({ prefix: `profiles/${id}/profile.json`, limit: 1 });
  if (!blobs.length) return null;
  const r = await fetch(blobs[0].url);
  if (!r.ok) return null;
  return r.json();
}

export async function saveProfile(profile) {
  await put(`profiles/${profile.id}/profile.json`, JSON.stringify(profile), {
    access: 'public',
    allowOverwrite: true,
  });
}

export function verifyToken(profile, token) {
  if (!profile || !token) return false;
  const hash = crypto.createHash('sha256').update(token).digest('hex');
  return hash === profile.deleteTokenHash;
}

export async function loadIndex() {
  try {
    const { blobs } = await list({ prefix: 'db/profiles-index.json', limit: 1 });
    if (!blobs.length) return [];
    const r = await fetch(blobs[0].url);
    return await r.json();
  } catch {
    return [];
  }
}

// AgeBand ordering for ±range filtering
export const AGE_ORDER = [
  '20s_early','20s_mid','20s_late',
  '30s_early','30s_mid','30s_late',
  '40s_early','40s_mid','40s_late',
];
