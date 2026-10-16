import { useState } from 'react';
import type { Skill } from '../types.ts';

type SkillThumbProps = {
  skill: Skill;
  size?: 'md' | 'sm';
};

/* Photo thumb with icon fallback: if the image file is missing or fails
   to load, the original Font Awesome tile renders instead — never broken. */
export default function SkillThumb({ skill, size = 'md' }: SkillThumbProps) {
  const [failed, setFailed] = useState(false);
  const cls = `thumb ${size === 'sm' ? 'thumb-sm' : ''} ${skill.tint} ${skill.img && !failed ? 'has-img' : ''}`;

  return (
    <span className={cls} aria-hidden="true">
      {skill.img && !failed ? (
        <img
          src={`${import.meta.env.BASE_URL}${skill.img}`}
          alt=""
          loading="lazy"
          onError={() => setFailed(true)}
        />
      ) : (
        <i className={skill.icon} />
      )}
    </span>
  );
}
