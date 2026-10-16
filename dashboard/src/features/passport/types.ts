export type Skill = {
  id: string;
  title: string;
  level: number;
  tag: string;
  icon: string;
  tint: string;
  img?: string;
  levelArt?: string;
};

export type NewSkill = {
  title: string;
  level: number;
};
