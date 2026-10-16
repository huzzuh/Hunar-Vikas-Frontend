import { mockDelay } from '../../../utils/mock.ts';
import type { GlobalFilters } from '../../../types/index.ts';
import type { CourseHealthRow } from '../types.ts';

const ROWS: CourseHealthRow[] = [
  { id: 'ch1', course: 'Solar PV Installer', trend: '+31% demand', placementRate: 78, status: 'growing' },
  { id: 'ch2', course: 'Digital Marketing Basics', trend: '+18% demand', placementRate: 64, status: 'growing' },
  { id: 'ch3', course: 'Advanced Pottery & Glazing', trend: '+4% demand', placementRate: 58, status: 'stable' },
  { id: 'ch4', course: 'Basic Mobile Repair', trend: '-6% demand', placementRate: 41, status: 'declining' },
];

export async function fetchCourseHealth(filters: GlobalFilters): Promise<CourseHealthRow[]> {
  void filters;
  await mockDelay(250);
  return ROWS.map((r) => ({ ...r }));
}
