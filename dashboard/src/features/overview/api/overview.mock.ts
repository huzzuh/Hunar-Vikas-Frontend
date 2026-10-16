import { mockDelay } from '../../../utils/mock.ts';
import type { GlobalFilters } from '../../../types/index.ts';
import type { OverviewCheck } from '../types.ts';

export const CHECKLIST_LABELS = [
  'Basic Information',
  'Skills & Experience',
  'Learning Interests',
  'Goals & Preferences',
] as const;

const DEFAULT_DONE = [true, true, false, false];

export async function fetchOverviewChecks(filters: GlobalFilters): Promise<OverviewCheck[]> {
  void filters;
  await mockDelay(200);
  return CHECKLIST_LABELS.map((label, i) => ({
    id: `check-${i}`,
    label,
    done: DEFAULT_DONE[i] ?? false,
  }));
}
