import { createHash } from 'crypto';

export const RANK_THRESHOLDS = [
  { name: 'ROOKIE', min: 0 },
  { name: 'PRO', min: 500 },
  { name: 'ALL_STAR', min: 2000 },
  { name: 'LEGEND', min: 5000 },
  { name: 'HALL_OF_FAME', min: 10000 },
] as const;

export type FameRank = typeof RANK_THRESHOLDS[number]['name'];

export function calculateRank(points: number): FameRank {
  return [...RANK_THRESHOLDS].reverse().find(r => points >= r.min)?.name || 'ROOKIE';
}

export function generateFameCode(userId: string): string {
  const hash = createHash('sha256').update(userId).digest('hex');
  return `G-FAME-${hash.substring(0, 8).toUpperCase()}`;
}

export function calculateNewStreak(lastActive: Date | null, currentStreak: number) {
  const now = new Date();
  if (!lastActive) return { newStreak: 1, reset: false, alreadyActiveToday: false };

  const last = new Date(lastActive);
  
  // Normalize dates to start of day for comparison
  const nowDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const lastDay = new Date(last.getFullYear(), last.getMonth(), last.getDate()).getTime();
  
  const diffTime = nowDay - lastDay;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return { newStreak: currentStreak, reset: false, alreadyActiveToday: true };
  if (diffDays === 1) return { newStreak: currentStreak + 1, reset: false, alreadyActiveToday: false };
  
  return { newStreak: 1, reset: true, alreadyActiveToday: false };
}
