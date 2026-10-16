import { toQueryString } from '../../../utils/filters.ts';
import { API_URL, USE_MOCK } from '../../../utils/mock.ts';
import type { GlobalFilters } from '../../../types/index.ts';
import type { DemandIntelData } from '../types.ts';
import { fetchDemandIntel } from './demand.mock.ts';

/**
 * Demand-intelligence backend contract. Mock by default (`VITE_USE_MOCK=true`);
 * flip the flag to hit the real endpoint with zero component changes.
 */
export async function getDemandIntel(filters: GlobalFilters): Promise<DemandIntelData> {
  if (USE_MOCK) return fetchDemandIntel(filters);
  const res = await fetch(`${API_URL}/api/demand?${toQueryString(filters)}`);
  if (!res.ok) throw new Error('Failed to load demand intelligence');
  return (await res.json()) as DemandIntelData;
}
