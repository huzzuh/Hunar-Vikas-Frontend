import type { Course } from './types.ts';
import { getCourses } from './api/training.service.ts';
import CourseList from './components/CourseList.tsx';
import TrainingPage from './components/TrainingPage.tsx';
import { useTraining } from './hooks/useTraining.ts';

export { CourseList, TrainingPage, getCourses, useTraining };
export type { Course };
