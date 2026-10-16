import { mockDelay } from '../../../utils/mock.ts';
import type { GlobalFilters } from '../../../types/index.ts';
import type { ValidationRow } from '../types.ts';

const ROWS: ValidationRow[] = [
  { id: 'ev1', change: 'Add battery-storage module', course: 'Solar PV Installer', employer: 'GreenWorks Energy', status: 'validated' },
  { id: 'ev2', change: 'Add analytics & ad-budget week', course: 'Digital Marketing Basics', employer: 'BazaarKart', status: 'in-review' },
  { id: 'ev3', change: 'Add packaging & costing module', course: 'Advanced Pottery & Glazing', employer: 'Craft Collective', status: 'proposed' },
  { id: 'ev4', change: 'Drop legacy Symbian repair unit', course: 'Basic Mobile Repair', employer: 'FixPoint Services', status: 'rejected' },
];

export async function fetchValidations(filters: GlobalFilters): Promise<ValidationRow[]> {
  void filters;
  await mockDelay(250);
  return ROWS.map((r) => ({ ...r }));
}
