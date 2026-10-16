import { toQueryString } from '../../../utils/filters.ts';
import { API_URL, USE_MOCK } from '../../../utils/mock.ts';
import type { GlobalFilters } from '../../../types/index.ts';
import type { CurriculumRow } from '../types.ts';
import { fetchCurriculum } from './curriculum.mock.ts';

/**
 * Curriculum-alignment backend contract. Mock by default (`VITE_USE_MOCK=true`);
 * flip the flag to hit the real endpoint with zero component changes.
 */
export async function getCurriculum(filters: GlobalFilters): Promise<CurriculumRow[]> {
  if (USE_MOCK) return fetchCurriculum(filters);
  const res = await fetch(`${API_URL}/api/curriculum?${toQueryString(filters)}`);
  if (!res.ok) throw new Error('Failed to load curriculum');
  return (await res.json()) as CurriculumRow[];
}
