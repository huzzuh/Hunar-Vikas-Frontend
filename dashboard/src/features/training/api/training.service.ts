import { toQueryString } from '../../../utils/filters.ts';
import { API_URL, USE_MOCK } from '../../../utils/mock.ts';
import type { GlobalFilters } from '../../../types/index.ts';
import type { Course } from '../types.ts';
import { fetchCourses } from './training.mock.ts';

/**
 * Training backend contract. Mock by default (`VITE_USE_MOCK=true`);
 * flip the flag to hit the real endpoint with zero component changes.
 */
export async function getCourses(filters: GlobalFilters): Promise<Course[]> {
  if (USE_MOCK) return fetchCourses(filters);
  const res = await fetch(`${API_URL}/api/courses?${toQueryString(filters)}`);
  if (!res.ok) throw new Error('Failed to load courses');
  return (await res.json()) as Course[];
}
