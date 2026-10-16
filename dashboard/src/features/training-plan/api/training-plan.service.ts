import { toQueryString } from '../../../utils/filters.ts';
import { API_URL, USE_MOCK } from '../../../utils/mock.ts';
import type { GlobalFilters } from '../../../types/index.ts';
import type { TrainingPlanRow } from '../types.ts';
import { fetchTrainingPlan } from './training-plan.mock.ts';

/**
 * Training-plan backend contract. Mock by default (`VITE_USE_MOCK=true`);
 * flip the flag to hit the real endpoint with zero component changes.
 */
export async function getTrainingPlan(filters: GlobalFilters): Promise<TrainingPlanRow[]> {
  if (USE_MOCK) return fetchTrainingPlan(filters);
  const res = await fetch(`${API_URL}/api/training-plan?${toQueryString(filters)}`);
  if (!res.ok) throw new Error('Failed to load training plan');
  return (await res.json()) as TrainingPlanRow[];
}
