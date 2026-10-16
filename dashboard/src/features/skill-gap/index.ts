import type { SkillGapRow } from './types.ts';
import { getSkillGaps } from './api/skill-gap.service.ts';
import SkillGapPage from './components/SkillGapPage.tsx';
import { useSkillGap } from './hooks/useSkillGap.ts';

export { getSkillGaps, SkillGapPage, useSkillGap };
export type { SkillGapRow };
