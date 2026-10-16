import { mockDelay } from '../../../utils/mock.ts';
import type { GlobalFilters } from '../../../types/index.ts';
import type { GuidanceRow } from '../types.ts';

const ROWS: GuidanceRow[] = [
  { id: 'cg1', currentSkill: 'Pottery Making', targetRole: 'Craft Entrepreneur', gap: 'Packaging & online selling', recommendedCourse: 'Digital Marketing Basics', opportunity: 'Local Artisan Exhibitions' },
  { id: 'cg2', currentSkill: 'Basic Wiring', targetRole: 'Solar PV Installer', gap: 'PV mounting & safety', recommendedCourse: 'Solar PV Installer', opportunity: 'Rooftop installation drives' },
  { id: 'cg3', currentSkill: 'Hand Painting', targetRole: 'Home-Decor Seller', gap: 'Product photography', recommendedCourse: 'Packaging for Handmade Products', opportunity: 'Community Enterprise Programs' },
  { id: 'cg4', currentSkill: 'Tailoring Basics', targetRole: 'Boutique Assistant', gap: 'Finishing & alterations', recommendedCourse: 'Advanced Tailoring', opportunity: 'Craft Business Development' },
];

export async function fetchGuidance(filters: GlobalFilters): Promise<GuidanceRow[]> {
  void filters;
  await mockDelay(250);
  return ROWS.map((r) => ({ ...r }));
}
