import { mockDelay } from '../../../utils/mock.ts';
import type { GlobalFilters } from '../../../types/index.ts';
import type { SkillGapRow } from '../types.ts';

const ROWS: SkillGapRow[] = [
  { id: 'sg1', role: 'Solar PV Installer', state: 'Maharashtra', district: 'Pune', sector: 'Green economy', demand: 4200, supply: 1800, gap: 2400 },
  { id: 'sg2', role: 'Data Associate', state: 'Maharashtra', district: 'Pune', sector: 'Digital & IT', demand: 6800, supply: 3900, gap: 2900 },
  { id: 'sg3', role: 'Healthcare Assistant', state: 'Maharashtra', district: 'Nagpur', sector: 'Healthcare', demand: 3500, supply: 2100, gap: 1400 },
  { id: 'sg4', role: 'Industrial Electrician', state: 'Maharashtra', district: 'Nashik', sector: 'Manufacturing', demand: 5100, supply: 3400, gap: 1700 },
];

export async function fetchSkillGaps(filters: GlobalFilters): Promise<SkillGapRow[]> {
  void filters;
  await mockDelay(250);
  return ROWS.map((r) => ({ ...r }));
}
