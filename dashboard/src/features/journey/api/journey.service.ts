import { toQueryString } from '../../../utils/filters.ts';
import { API_URL, USE_MOCK } from '../../../utils/mock.ts';
import type { GlobalFilters } from '../../../types/index.ts';
import type { JourneyMilestone } from '../types.ts';
import { fetchJourney } from './journey.mock.ts';

/**
 * Growth-journey backend contract. Mock by default (`VITE_USE_MOCK=true`);
 * flip the flag to hit the real endpoint with zero component changes.
 */
export async function getJourney(filters: GlobalFilters): Promise<JourneyMilestone[]> {
  if (USE_MOCK) return fetchJourney(filters);
  const res = await fetch(`${API_URL}/api/journey?${toQueryString(filters)}`);
  if (!res.ok) throw new Error('Failed to load journey');
  return (await res.json()) as JourneyMilestone[];
}
