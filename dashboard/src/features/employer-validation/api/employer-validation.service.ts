import { toQueryString } from '../../../utils/filters.ts';
import { API_URL, USE_MOCK } from '../../../utils/mock.ts';
import type { GlobalFilters } from '../../../types/index.ts';
import type { ValidationRow } from '../types.ts';
import { fetchValidations } from './employer-validation.mock.ts';

/**
 * Employer-validation backend contract. Mock by default (`VITE_USE_MOCK=true`);
 * flip the flag to hit the real endpoint with zero component changes.
 */
export async function getValidations(filters: GlobalFilters): Promise<ValidationRow[]> {
  if (USE_MOCK) return fetchValidations(filters);
  const res = await fetch(`${API_URL}/api/validations?${toQueryString(filters)}`);
  if (!res.ok) throw new Error('Failed to load validations');
  return (await res.json()) as ValidationRow[];
}
