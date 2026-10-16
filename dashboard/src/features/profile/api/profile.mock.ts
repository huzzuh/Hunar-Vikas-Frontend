import { mockDelay } from '../../../utils/mock.ts';
import type { GlobalFilters } from '../../../types/index.ts';
import type { ProfileMeta } from '../types.ts';

export const INTEREST_OPTIONS = [
  'Advanced Glazing',
  'Product Photography',
  'Digital Selling',
  'Warli Painting',
  'Tailoring',
  'Solar Installation',
  'Food Processing',
  'Beauty & Wellness',
];

export const ASPIRATIONS = ['Grow my home business', 'Find a job', 'Get certified', 'Learn new skills'];

export const MODES = ['Online', 'In-person', 'Hybrid'];

export async function fetchProfileMeta(filters: GlobalFilters): Promise<ProfileMeta> {
  void filters;
  await mockDelay(200);
  return {
    interestOptions: [...INTEREST_OPTIONS],
    aspirations: [...ASPIRATIONS],
    modes: [...MODES],
  };
}
