import { useState } from 'react';
import type { FormEvent } from 'react';
import { useRole } from '../../../context/RoleContext.tsx';
import { useToastContext } from '../../../context/ToastContext.tsx';
import { useOverview } from '../../overview/index.ts';
import { SkillThumb, usePassport } from '../../passport/index.ts';
import '../profile.css';
import { useProfile } from '../hooks/useProfile.ts';

const STEPS = ['Basic info', 'Expertise', 'Learning', 'Goals'];

export default function ProfileSetup({ onClose }: { onClose: () => void }) {
  const { profile, saveBasic } = useRole();
  const { notify } = useToastContext();
  const { skills, updateSkillLevel, removeSkill, addSkill } = usePassport();
  const {
    interests,
    aspiration,
    prefMode,
    chips,
    aspirations,
    modes,
    toggleInterest,
    setAspiration,
    setPrefMode,
  } = useProfile();
  const { completeSection } = useOverview();

  const [step, setStep] = useState(0);
  const [name, setName] = useState(profile.name);
  const [place, setPlace] = useState(profile.place);
  const [draftSkill, setDraftSkill] = useState('');
  const [draftLevel, setDraftLevel] = useState(3);
  const [customInterest, setCustomInterest] = useState('');

  function next() {
    if (step === 0) {
      if (name.trim().length < 2 || place.trim().length < 2) {
        notify('Enter your name and place to continue');
        return;
      }
      saveBasic(name.trim(), place.trim());
      completeSection(0);
      setStep(1);
      return;
    }
    if (step === 1) {
      if (skills.length === 0) {
        notify('Add at least one skill to continue');
        return;
      }
      completeSection(1);
      setStep(2);
      return;
    }
    if (interests.length === 0) {
      notify('Pick at least one thing you want to learn');
      return;
    }
    completeSection(2);
    setStep(3);
  }

  function finish() {
    if (!aspiration) {
      notify('Choose what you want to achieve');
      return;
    }
    if (!prefMode) {
      notify('Choose a preferred training mode');
      return;
    }
    completeSection(3);
    onClose();
    notify('Profile updated — looking sharp!');
  }

  async function addDraftSkill(e: FormEvent): Promise<void> {
    e.preventDefault();
    if (draftSkill.trim().length < 2) {
      notify('Enter a skill name (min 2 characters)');
      return;
    }
    await addSkill(draftSkill.trim(), draftLevel);
    setDraftSkill('');
    setDraftLevel(3);
  }

  function addCustomInterest(e: FormEvent) {
    e.preventDefault();
    const t = customInterest.trim();
    if (t.length < 2) {
      notify('Enter an interest (min 2 characters)');
      return;
    }
    if (!interests.includes(t)) toggleInterest(t);
    setCustomInterest('');
  }

  return (
    <div className="modal-wrap" role="dialog" aria-modal="true" aria-label="Complete your profile">
      <div className="modal modal-wide">
        <div className="modal-head">
          <div>
            <strong>Complete your profile</strong>
            <small className="setup-sub">
              Step {step + 1} of 4 · {STEPS[step]}
            </small>
          </div>
          <button type="button" className="icon-btn" aria-label="Close profile setup" onClick={onClose}>
            <i className="fa-solid fa-xmark" aria-hidden="true" />
          </button>
        </div>

        <ol className="setup-steps" aria-hidden="true">
          {STEPS.map((s, i) => (
            <li key={s} className={i < step ? 'done' : i === step ? 'now' : ''}>
              <span>{i < step ? <i className="fa-solid fa-check" /> : i + 1}</span>
              <small>{s}</small>
            </li>
          ))}
        </ol>

        {step === 0 && (
          <div className="setup-pane">
            <p className="setup-lede">Shown across your workspace.</p>
            <label className="setup-field">
              Full name
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                autoComplete="name"
              />
            </label>
            <label className="setup-field">
              Place
              <input
                value={place}
                onChange={(e) => setPlace(e.target.value)}
                placeholder="City, India"
                autoComplete="address-level2"
              />
            </label>
            <p className="setup-hint">
              <i className="fa-solid fa-id-card" aria-hidden="true" /> Signed in as {profile.role} (demo
              profile).
            </p>
          </div>
        )}

        {step === 1 && (
          <div className="setup-pane">
            <p className="setup-lede">Level 4–5 means you’re good at it.</p>
            {skills.length === 0 && <p className="empty">No skills yet — add your first one below.</p>}
            <ul className="setup-skills">
              {skills.map((s) => (
                <li key={s.id}>
                  <SkillThumb skill={s} size="sm" />
                  <span className="setup-skill-name">
                    <strong>{s.title}</strong>
                    <small>{s.tag}</small>
                  </span>
                  <label className="level-pick">
                    Level
                    <select
                      value={s.level}
                      onChange={(e) => void updateSkillLevel(s.id, Number(e.target.value))}
                      aria-label={`Expertise level for ${s.title}`}
                    >
                      {[1, 2, 3, 4, 5].map((n) => (
                        <option key={n} value={n}>
                          {n} / 5
                        </option>
                      ))}
                    </select>
                  </label>
                  <button
                    type="button"
                    className="icon-btn danger-sm"
                    onClick={() => void removeSkill(s.id)}
                    aria-label={`Remove ${s.title}`}
                  >
                    <i className="fa-solid fa-trash" aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
            <form className="add-form" onSubmit={addDraftSkill}>
              <input
                value={draftSkill}
                onChange={(e) => setDraftSkill(e.target.value)}
                placeholder="e.g. Warli Painting"
                aria-label="New skill name"
              />
              <label className="level-pick">
                Level:
                <select
                  value={draftLevel}
                  onChange={(e) => setDraftLevel(Number(e.target.value))}
                  aria-label="New skill level"
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>
                      {n} / 5
                    </option>
                  ))}
                </select>
              </label>
              <button type="submit" className="btn btn-primary btn-sm">
                Add
              </button>
            </form>
            <p className="setup-hint">Levels 1–2 Beginner · 3 Intermediate · 4–5 Experienced.</p>
          </div>
        )}

        {step === 2 && (
          <div className="setup-pane">
            <p className="setup-lede">Pick what to learn next.</p>
            <div className="chip-pick" role="group" aria-label="Learning interests">
              {chips.map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`pick ${interests.includes(c) ? 'on' : ''}`}
                  onClick={() => toggleInterest(c)}
                  aria-pressed={interests.includes(c)}
                >
                  {interests.includes(c) && <i className="fa-solid fa-check" aria-hidden="true" />}
                  {c}
                </button>
              ))}
            </div>
            <form className="add-form" onSubmit={addCustomInterest}>
              <input
                value={customInterest}
                onChange={(e) => setCustomInterest(e.target.value)}
                placeholder="Something else? Type it here"
                aria-label="Custom interest"
              />
              <button type="submit" className="btn btn-primary btn-sm">
                Add
              </button>
            </form>
          </div>
        )}

        {step === 3 && (
          <div className="setup-pane">
            <p className="setup-lede">What are you working towards?</p>
            <p className="opt-title">I want to…</p>
            <div className="opt-list" role="radiogroup" aria-label="Aspiration">
              {aspirations.map((a) => (
                <label key={a} className={`opt ${aspiration === a ? 'on' : ''}`}>
                  <input
                    type="radio"
                    name="aspiration"
                    checked={aspiration === a}
                    onChange={() => setAspiration(a)}
                  />
                  <span>{a}</span>
                </label>
              ))}
            </div>
            <p className="opt-title">Preferred training mode</p>
            <div className="opt-list" role="radiogroup" aria-label="Preferred training mode">
              {modes.map((m) => (
                <label key={m} className={`opt ${prefMode === m ? 'on' : ''}`}>
                  <input
                    type="radio"
                    name="prefMode"
                    checked={prefMode === m}
                    onChange={() => setPrefMode(m)}
                  />
                  <span>{m}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        <div className="setup-foot">
          {step > 0 && (
            <button type="button" className="btn btn-outline" onClick={() => setStep((s) => s - 1)}>
              <i className="fa-solid fa-arrow-left" aria-hidden="true" /> Back
            </button>
          )}
          {step < 3 ? (
            <button type="button" className="btn btn-primary btn-full" onClick={next}>
              Save & Continue <i className="fa-solid fa-arrow-right" aria-hidden="true" />
            </button>
          ) : (
            <button type="button" className="btn btn-primary btn-full" onClick={finish}>
              <i className="fa-solid fa-check" aria-hidden="true" /> Finish Setup
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
