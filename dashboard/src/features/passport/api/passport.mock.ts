import { mockDelay } from '../../../utils/mock.ts';
import type { GlobalFilters } from '../../../types/index.ts';
import type { NewSkill, Skill } from '../types.ts';

export const INITIAL_SKILLS: Skill[] = [
  { id: 's1', title: 'Pottery Making', level: 4, tag: 'Experienced', icon: 'fa-solid fa-wheat-awn', tint: 'tint-clay', img: 'skills/pottery.jpg' },
  { id: 's2', title: 'Hand Painting', level: 3, tag: 'Intermediate', icon: 'fa-solid fa-palette', tint: 'tint-blue', img: 'skills/painting.jpg' },
  { id: 's4', title: 'Home Decor', level: 4, tag: 'Experienced', icon: 'fa-solid fa-house-chimney', tint: 'tint-amber', img: 'skills/homedeco.jpg', levelArt: 'skills/homedeco.jpg' },
];

export function tagForLevel(level: number): string {
  if (level >= 4) return 'Experienced';
  if (level === 3) return 'Intermediate';
  return 'Beginner';
}

export async function fetchSkills(filters: GlobalFilters): Promise<Skill[]> {
  void filters;
  await mockDelay(200);
  return INITIAL_SKILLS.map((s) => ({ ...s }));
}

export async function createSkill(input: NewSkill): Promise<Skill> {
  await mockDelay(200);
  return {
    id: `s${Date.now()}`,
    title: input.title,
    level: input.level,
    tag: tagForLevel(input.level),
    icon: 'fa-solid fa-sparkles',
    tint: 'tint-mint',
  };
}

export async function changeSkillLevel(skill: Skill, level: number): Promise<Skill> {
  await mockDelay(150);
  return { ...skill, level, tag: tagForLevel(level) };
}

export async function deleteSkill(id: string): Promise<string> {
  void id;
  await mockDelay(150);
  return id;
}
