import { mockDelay } from '../../../utils/mock.ts';
import type { GlobalFilters } from '../../../types/index.ts';
import type { JourneyMilestone } from '../types.ts';

export const JOURNEY: JourneyMilestone[] = [
  { year: '2018', title: 'Learned Pottery', desc: 'Learned pottery from local artisans.', done: true },
  { year: '2021', title: 'Started Home Business', desc: 'Started selling handmade goods from home.', done: true },
  { year: '2024', title: 'Exploring New Skills', desc: 'Learning digital marketing and advanced glazing.', done: false },
];

export async function fetchJourney(filters: GlobalFilters): Promise<JourneyMilestone[]> {
  void filters;
  await mockDelay(200);
  return JOURNEY.map((j) => ({ ...j }));
}
