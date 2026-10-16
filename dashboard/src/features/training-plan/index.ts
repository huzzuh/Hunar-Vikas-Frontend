import type { TrainingPlanRow } from './types.ts';
import { getTrainingPlan } from './api/training-plan.service.ts';
import TrainingPlanPage from './components/TrainingPlanPage.tsx';
import { useTrainingPlan } from './hooks/useTrainingPlan.ts';

export { getTrainingPlan, TrainingPlanPage, useTrainingPlan };
export type { TrainingPlanRow };
