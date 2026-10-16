import type { GuidanceRow } from './types.ts';
import { getGuidance } from './api/career-guidance.service.ts';
import CareerGuidancePage from './components/CareerGuidancePage.tsx';
import { useCareerGuidance } from './hooks/useCareerGuidance.ts';

export { CareerGuidancePage, getGuidance, useCareerGuidance };
export type { GuidanceRow };
