import { toQueryString } from '../../../utils/filters.ts';
import { API_URL, USE_MOCK } from '../../../utils/mock.ts';
import type { GlobalFilters } from '../../../types/index.ts';
import type { Opportunity } from '../types.ts';
import { fetchOpportunities } from './opportunities.mock.ts';

/**
 * Opportunities backend contract. Mock by default (`VITE_USE_MOCK=true`);
 * flip the flag to hit the real endpoint with zero component changes.
 */
export async function getOpportunities(filters: GlobalFilters): Promise<Opportunity[]> {
  if (USE_MOCK) return fetchOpportunities(filters);
  const res = await fetch(`${API_URL}/api/opportunities?${toQueryString(filters)}`);
  if (!res.ok) throw new Error('Failed to load opportunities');
  return (await res.json()) as Opportunity[];
}
