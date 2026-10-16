import { toQueryString } from '../../../utils/filters.ts';
import { API_URL, USE_MOCK } from '../../../utils/mock.ts';
import type { GlobalFilters } from '../../../types/index.ts';
import type { CourseHealthRow } from '../types.ts';
import { fetchCourseHealth } from './course-health.mock.ts';

/**
 * Course-health backend contract. Mock by default (`VITE_USE_MOCK=true`);
 * flip the flag to hit the real endpoint with zero component changes.
 */
export async function getCourseHealth(filters: GlobalFilters): Promise<CourseHealthRow[]> {
  if (USE_MOCK) return fetchCourseHealth(filters);
  const res = await fetch(`${API_URL}/api/course-health?${toQueryString(filters)}`);
  if (!res.ok) throw new Error('Failed to load course health');
  return (await res.json()) as CourseHealthRow[];
}
