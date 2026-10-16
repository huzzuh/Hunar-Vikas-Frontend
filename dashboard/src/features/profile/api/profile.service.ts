import { toQueryString } from '../../../utils/filters.ts';
import { API_URL, USE_MOCK } from '../../../utils/mock.ts';
import type { GlobalFilters } from '../../../types/index.ts';
import type { ProfileMeta } from '../types.ts';
import { fetchProfileMeta } from './profile.mock.ts';

/**
 * Profile backend contract. Mock by default (`VITE_USE_MOCK=true`);
 * flip the flag to hit the real endpoint with zero component changes.
 */
export async function getProfileMeta(filters: GlobalFilters): Promise<ProfileMeta> {
  if (USE_MOCK) return fetchProfileMeta(filters);
  const res = await fetch(`${API_URL}/api/profile-meta?${toQueryString(filters)}`);
  if (!res.ok) throw new Error('Failed to load profile options');
  return (await res.json()) as ProfileMeta;
}
