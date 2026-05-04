import { list } from '@vercel/blob';

function requireAdmin(req, res) {
  const secret = req.headers['x-admin-secret'] || req.query.s;
  if (!process.env.ADMIN_SECRET || secret !== process.env.ADMIN_SECRET) {
    res.status(401).json({ error: 'Unauthorized' });
    return false;
  }
  return true;
}

const COLUMNS = [
  'id','nickname','gender','ageBand','city','job','heightBand',
  'contactMethod','contact','score','percentile',
  'personalityType','dateStyle','datingPersonality','firstDatePref',
  'balanceLooksHeight','balanceCareerMoney','balanceChemistryStability',
  'priorityAppearance','priorityHeight','priorityWealth','priorityCareer',
  'extraMemo','consentNotification','createdAt',
];

function escapeCSV(val) {
  if (val === null || val === undefined) return '';
  const str = String(val);
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-admin-secret');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (!requireAdmin(req, res)) return;

  const { blobs: profileBlobs } = await list({ prefix: 'profiles/', limit: 1000 });
  const jsonBlobs = profileBlobs.filter((b) => b.pathname.endsWith('/profile.json'));

  const profiles = await Promise.all(
    jsonBlobs.map(async (b) => {
      try {
        const r = await fetch(b.url);
        return await r.json();
      } catch {
        return null;
      }
    })
  );

  const rows = profiles
    .filter(Boolean)
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    .map((p) => COLUMNS.map((col) => escapeCSV(p[col])).join(','));

  const csv = [COLUMNS.join(','), ...rows].join('\n');
  const bom = '﻿'; // UTF-8 BOM for Excel

  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', `attachment; filename="charm-match-${new Date().toISOString().slice(0,10)}.csv"`);
  return res.send(bom + csv);
}
