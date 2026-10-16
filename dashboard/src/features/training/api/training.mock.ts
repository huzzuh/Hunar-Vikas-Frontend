import { mockDelay } from '../../../utils/mock.ts';
import type { GlobalFilters } from '../../../types/index.ts';
import type { Course } from '../types.ts';

export const COURSES: Course[] = [
  {
    id: 'c1',
    title: 'Advanced Pottery & Glazing',
    tag: 'Skill Development',
    mode: 'In-person',
    modeIcon: 'fa-solid fa-location-dot',
    place: 'Kala Academy, Pune',
    provider: 'Example Provider',
    desc: 'Advanced glazing, finishes and quality improvement.',
    icon: 'fa-solid fa-jar-wheat',
    tint: 'tint-clay',
  },
  {
    id: 'c2',
    title: 'Packaging for Handmade Products',
    tag: 'Entrepreneurship',
    mode: 'Hybrid',
    modeIcon: 'fa-solid fa-layer-group',
    place: 'Pune, India',
    provider: 'Example Provider',
    desc: 'Packaging, branding and sustainable packing.',
    icon: 'fa-solid fa-box-open',
    tint: 'tint-amber',
  },
  {
    id: 'c3',
    title: 'Digital Marketing Basics',
    tag: 'Business Skills',
    mode: 'Online',
    modeIcon: 'fa-solid fa-globe',
    place: 'India (Online)',
    provider: 'Example Provider',
    desc: 'Social media, online selling and basic digital marketing.',
    icon: 'fa-solid fa-laptop',
    tint: 'tint-leaf',
  },
];

export async function fetchCourses(filters: GlobalFilters): Promise<Course[]> {
  void filters;
  await mockDelay(200);
  return COURSES.map((c) => ({ ...c }));
}
