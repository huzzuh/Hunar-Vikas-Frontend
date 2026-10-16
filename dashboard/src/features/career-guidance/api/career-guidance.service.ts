import { toQueryString } from '../../../utils/filters.ts';
import { API_URL, USE_MOCK } from '../../../utils/mock.ts';
import type { GlobalFilters } from '../../../types/index.ts';
import type { GuidanceRow } from '../types.ts';
import { fetchGuidance } from './career-guidance.mock.ts';

/**
 * Career-guidance backend contract. Mock by default (`VITE_USE_MOCK=true`);
 * flip the flag to hit the real endpoint with zero component changes.
 */
export async function getGuidance(filters: GlobalFilters): Promise<GuidanceRow[]> {
  if (USE_MOCK) return fetchGuidance(filters);
  const res = await fetch(`${API_URL}/api/guidance?${toQueryString(filters)}`);
  if (!res.ok) throw new Error('Failed to load guidance');
  return (await res.json()) as GuidanceRow[];
}
