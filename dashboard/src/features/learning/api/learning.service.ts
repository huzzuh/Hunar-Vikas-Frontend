import { toQueryString } from '../../../utils/filters.ts';
import { API_URL, USE_MOCK } from '../../../utils/mock.ts';
import type { GlobalFilters } from '../../../types/index.ts';
import type { Goal } from '../types.ts';
import { fetchGoals } from './learning.mock.ts';

/**
 * Learning-goals backend contract. Mock by default (`VITE_USE_MOCK=true`);
 * flip the flag to hit the real endpoint with zero component changes.
 */
export async function getGoals(filters: GlobalFilters): Promise<Goal[]> {
  if (USE_MOCK) return fetchGoals(filters);
  const res = await fetch(`${API_URL}/api/goals?${toQueryString(filters)}`);
  if (!res.ok) throw new Error('Failed to load goals');
  return (await res.json()) as Goal[];
}
