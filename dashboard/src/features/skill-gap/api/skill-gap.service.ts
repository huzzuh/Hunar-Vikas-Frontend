import { toQueryString } from '../../../utils/filters.ts';
import { API_URL, USE_MOCK } from '../../../utils/mock.ts';
import type { GlobalFilters } from '../../../types/index.ts';
import type { SkillGapRow } from '../types.ts';
import { fetchSkillGaps } from './skill-gap.mock.ts';

/**
 * Skill-gap backend contract. Mock by default (`VITE_USE_MOCK=true`);
 * flip the flag to hit the real endpoint with zero component changes.
 */
export async function getSkillGaps(filters: GlobalFilters): Promise<SkillGapRow[]> {
  if (USE_MOCK) return fetchSkillGaps(filters);
  const res = await fetch(`${API_URL}/api/skill-gaps?${toQueryString(filters)}`);
  if (!res.ok) throw new Error('Failed to load skill gaps');
  return (await res.json()) as SkillGapRow[];
}
