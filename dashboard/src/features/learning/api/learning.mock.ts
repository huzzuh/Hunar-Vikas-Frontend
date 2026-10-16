import { mockDelay } from '../../../utils/mock.ts';
import type { GlobalFilters } from '../../../types/index.ts';
import type { Goal } from '../types.ts';

export const INITIAL_GOALS: Goal[] = [
  { id: 'g1', title: 'Advanced Glazing', desc: 'Advanced finishing techniques.', pct: 25, icon: 'fa-solid fa-jar' },
  { id: 'g2', title: 'Product Photography', desc: 'Attractive product photos.', pct: 0, icon: 'fa-solid fa-camera' },
  { id: 'g3', title: 'Digital Selling', desc: 'Online platforms and digital marketing.', pct: 0, icon: 'fa-solid fa-chart-column' },
];

export async function fetchGoals(filters: GlobalFilters): Promise<Goal[]> {
  void filters;
  await mockDelay(200);
  return INITIAL_GOALS.map((g) => ({ ...g }));
}
