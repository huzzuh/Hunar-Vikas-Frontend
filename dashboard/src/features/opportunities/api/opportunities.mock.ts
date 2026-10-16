import { mockDelay } from '../../../utils/mock.ts';
import type { GlobalFilters } from '../../../types/index.ts';
import type { Opportunity } from '../types.ts';

export const OPPORTUNITIES: Opportunity[] = [
  {
    id: 'o1',
    title: 'Local Artisan Exhibitions',
    desc: 'Showcase and sell at local events and melas.',
    icon: 'fa-solid fa-shop',
    tint: 'tint-amber',
  },
  {
    id: 'o2',
    title: 'Craft Business Development',
    desc: 'Business, branding and market linkages.',
    icon: 'fa-solid fa-users',
    tint: 'tint-leaf',
  },
  {
    id: 'o3',
    title: 'Community Enterprise Programs',
    desc: 'Collective initiatives and self-help groups.',
    icon: 'fa-solid fa-seedling',
    tint: 'tint-mint',
  },
];

export async function fetchOpportunities(filters: GlobalFilters): Promise<Opportunity[]> {
  void filters;
  await mockDelay(200);
  return OPPORTUNITIES.map((o) => ({ ...o }));
}
