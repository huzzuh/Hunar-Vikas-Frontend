import type { NewSkill, Skill } from './types.ts';
import { addSkill, getSkills, removeSkill, updateSkillLevel } from './api/passport.service.ts';
import PassportPage from './components/PassportPage.tsx';
import SkillPassport from './components/SkillPassport.tsx';
import SkillThumb from './components/SkillThumb.tsx';
import { usePassport } from './hooks/usePassport.ts';

export { PassportPage, SkillPassport, SkillThumb, addSkill, getSkills, removeSkill, updateSkillLevel, usePassport };
export type { NewSkill, Skill };
