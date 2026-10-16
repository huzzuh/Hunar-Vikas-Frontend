import type { CurriculumRow } from './types.ts';
import { getCurriculum } from './api/curriculum.service.ts';
import CurriculumPage from './components/CurriculumPage.tsx';
import { useCurriculum } from './hooks/useCurriculum.ts';

export { CurriculumPage, getCurriculum, useCurriculum };
export type { CurriculumRow };
