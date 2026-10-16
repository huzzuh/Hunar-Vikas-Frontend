import { mockDelay } from '../../../utils/mock.ts';
import type { GlobalFilters } from '../../../types/index.ts';
import type { CurriculumRow } from '../types.ts';

const ROWS: CurriculumRow[] = [
  { id: 'cu1', course: 'Solar PV Installer', courseSkills: 'Wiring, mounting', employerSkills: '+ Battery storage, net-metering', alignmentScore: 68, suggestedUpdate: 'Add 20-hr storage & safety module' },
  { id: 'cu2', course: 'Digital Marketing Basics', courseSkills: 'Social posts, listings', employerSkills: '+ Analytics, ad budgets', alignmentScore: 74, suggestedUpdate: 'Add analytics & paid-ads week' },
  { id: 'cu3', course: 'Advanced Pottery & Glazing', courseSkills: 'Glazing, finishes', employerSkills: '+ Packaging, pricing', alignmentScore: 81, suggestedUpdate: 'Add packaging & costing module' },
  { id: 'cu4', course: 'Tailoring Foundation', courseSkills: 'Cutting, stitching', employerSkills: '+ Boutique finishing, alterations', alignmentScore: 63, suggestedUpdate: 'Add finishing & alterations unit' },
];

export async function fetchCurriculum(filters: GlobalFilters): Promise<CurriculumRow[]> {
  void filters;
  await mockDelay(250);
  return ROWS.map((r) => ({ ...r }));
}
