import { toQueryString } from '../../../utils/filters.ts';
import { API_URL, USE_MOCK } from '../../../utils/mock.ts';
import type { GlobalFilters } from '../../../types/index.ts';
import type { NewSkill, Skill } from '../types.ts';
import { changeSkillLevel, createSkill, deleteSkill, fetchSkills } from './passport.mock.ts';

/**
 * Skill-passport backend contract. Mock by default (`VITE_USE_MOCK=true`);
 * flip the flag to hit the real endpoints with zero component changes.
 */
export async function getSkills(filters: GlobalFilters): Promise<Skill[]> {
  if (USE_MOCK) return fetchSkills(filters);
  const res = await fetch(`${API_URL}/api/skills?${toQueryString(filters)}`);
  if (!res.ok) throw new Error('Failed to load skills');
  return (await res.json()) as Skill[];
}

export async function addSkill(input: NewSkill): Promise<Skill> {
  if (USE_MOCK) return createSkill(input);
  const res = await fetch(`${API_URL}/api/skills`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error('Failed to add skill');
  return (await res.json()) as Skill;
}

export async function updateSkillLevel(skill: Skill, level: number): Promise<Skill> {
  if (USE_MOCK) return changeSkillLevel(skill, level);
  const res = await fetch(`${API_URL}/api/skills/${skill.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ level }),
  });
  if (!res.ok) throw new Error('Failed to update skill');
  return (await res.json()) as Skill;
}

export async function removeSkill(id: string): Promise<void> {
  if (USE_MOCK) {
    await deleteSkill(id);
    return;
  }
  const res = await fetch(`${API_URL}/api/skills/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to remove skill');
}
