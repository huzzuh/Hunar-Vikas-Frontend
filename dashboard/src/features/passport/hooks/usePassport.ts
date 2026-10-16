import { useEffect, useState } from 'react';
import { useFilters } from '../../../context/FilterContext.tsx';
import { useToastContext } from '../../../context/ToastContext.tsx';
import { useAsync } from '../../../hooks/useAsync.ts';
import {
  addSkill as addSkillService,
  getSkills,
  removeSkill as removeSkillService,
  updateSkillLevel as updateSkillService,
} from '../api/passport.service.ts';
import type { Skill } from '../types.ts';

export function usePassport() {
  const { filters } = useFilters();
  const { notify } = useToastContext();
  const { data, loading, error, reload } = useAsync(
    () => getSkills(filters),
    [filters.state, filters.district, filters.sector, filters.dateRange],
  );
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    if (data !== null) setSkills(data);
  }, [data]);

  async function addSkill(name: string, level: number): Promise<void> {
    const created = await addSkillService({ title: name, level });
    setSkills((prev) => [...prev, created]);
    notify(`“${created.title}” added to your Skill Passport`);
  }

  async function updateSkillLevel(id: string, level: number): Promise<void> {
    const current = skills.find((s) => s.id === id);
    if (current === undefined) return;
    const updated = await updateSkillService(current, level);
    setSkills((prev) => prev.map((s) => (s.id === id ? updated : s)));
  }

  async function removeSkill(id: string): Promise<void> {
    await removeSkillService(id);
    setSkills((prev) => prev.filter((s) => s.id !== id));
  }

  return { skills, loading, error, reload, addSkill, updateSkillLevel, removeSkill };
}
