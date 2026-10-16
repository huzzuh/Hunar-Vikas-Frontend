import { useState } from 'react';
import type { FormEvent } from 'react';
import { useToastContext } from '../../../context/ToastContext.tsx';
import { usePassport } from '../hooks/usePassport.ts';
import type { Skill } from '../types.ts';
import Dots from './Dots.tsx';
import SkillThumb from './SkillThumb.tsx';

/* Level indicator: dots only (no photo banner). */
function SkillLevel({ skill }: { skill: Skill }) {
  return <Dots level={skill.level} />;
}

export default function SkillPassport() {
  const { skills, addSkill } = usePassport();
  const { notify } = useToastContext();
  const [showAdd, setShowAdd] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const NEW_SKILL_LEVEL = 3;

  async function submit(e: FormEvent): Promise<void> {
    e.preventDefault();
    const name = newSkill.trim();
    if (name.length < 2) {
      notify('Enter a skill name (min 2 characters)');
      return;
    }
    await addSkill(name, NEW_SKILL_LEVEL);
    setNewSkill('');
    setShowAdd(false);
  }

  return (
    <section id="passport" className="panel reveal" aria-label="My Skill Passport">
      <div className="panel-head">
        <span className="panel-ico">
          <i className="fa-solid fa-briefcase" aria-hidden="true" />
        </span>
        <span className="panel-title">
          <strong>My Skill Passport</strong>
          <small>All your skills in one place.</small>
        </span>
        <button type="button" className="btn btn-outline btn-sm" onClick={() => setShowAdd((v) => !v)}>
          <i className="fa-solid fa-plus" aria-hidden="true" /> Add a Skill
        </button>
      </div>
      {showAdd && (
        <form className="add-form" onSubmit={submit}>
          <input
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="e.g. Warli Painting"
            aria-label="New skill name"
          />
          <button type="submit" className="btn btn-primary btn-sm">
            Add
          </button>
        </form>
      )}
      <div className="skill-grid">
        {skills.map((s) => (
          <article key={s.id} className="skill">
            <SkillThumb skill={s} />
            <span className="skill-text">
              <strong>{s.title}</strong>
              <SkillLevel skill={s} />
              <span className={`tag ${s.tag === 'Intermediate' ? 'warn' : 'ok'}`}>{s.tag}</span>
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}
