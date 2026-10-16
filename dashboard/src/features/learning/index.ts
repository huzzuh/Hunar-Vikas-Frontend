import type { Goal } from './types.ts';
import { getGoals } from './api/learning.service.ts';
import LearningGoals from './components/LearningGoals.tsx';
import LearningPage from './components/LearningPage.tsx';
import { useLearning } from './hooks/useLearning.ts';

export { getGoals, LearningGoals, LearningPage, useLearning };
export type { Goal };
