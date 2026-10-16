import { mockDelay } from '../../../utils/mock.ts';
import type { GlobalFilters } from '../../../types/index.ts';
import type { TrainingPlanRow } from '../types.ts';

const ROWS: TrainingPlanRow[] = [
  { id: 'tp1', state: 'Maharashtra', priorityTrade: 'Solar PV Installer', seats: 2400, trainers: 48, equipmentGap: '12 rooftop rigs' },
  { id: 'tp2', state: 'Maharashtra', priorityTrade: 'Data Associate', seats: 3000, trainers: 60, equipmentGap: '40 lab seats' },
  { id: 'tp3', state: 'Maharashtra', priorityTrade: 'Healthcare Assistant', seats: 1800, trainers: 36, equipmentGap: '6 simulation kits' },
  { id: 'tp4', state: 'Maharashtra', priorityTrade: 'Industrial Electrician', seats: 2100, trainers: 42, equipmentGap: '8 PLC trainers' },
];

export async function fetchTrainingPlan(filters: GlobalFilters): Promise<TrainingPlanRow[]> {
  void filters;
  await mockDelay(250);
  return ROWS.map((r) => ({ ...r }));
}
