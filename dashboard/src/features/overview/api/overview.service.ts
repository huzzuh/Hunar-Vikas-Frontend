import { toQueryString } from '../../../utils/filters.ts';
import { API_URL, USE_MOCK } from '../../../utils/mock.ts';
import type { GlobalFilters } from '../../../types/index.ts';
import type { OverviewCheck } from '../types.ts';
import { fetchOverviewChecks } from './overview.mock.ts';

/**
 * Overview backend contract. Mock by default (`VITE_USE_MOCK=true`);
 * flip the flag to hit the real endpoint with zero component changes.
 */
export async function getOverviewChecks(filters: GlobalFilters): Promise<OverviewCheck[]> {
  if (USE_MOCK) return fetchOverviewChecks(filters);
  const res = await fetch(`${API_URL}/api/overview?${toQueryString(filters)}`);
  if (!res.ok) throw new Error('Failed to load overview');
  return (await res.json()) as OverviewCheck[];
}
