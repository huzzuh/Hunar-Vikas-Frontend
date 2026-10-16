import { useState } from 'react';
import type { FormEvent } from 'react';
import { districtsFor, INDIA_STATES, LANGUAGES } from '@shared/india.ts';
import { Chip, Field } from '@shared/ui.tsx';
import { useUserProfile } from '../hooks/useUserProfile.ts';
import { useProfile } from '../hooks/useProfile.ts';
import type { Availability, Education, TrainingMode } from '../types.ts';

const EDUCATIONS: Education[] = ['Below 10th', '10th', '12th', 'ITI/Diploma', 'Graduate', 'Postgraduate'];
const AVAILABILITIES: { id: Availability; label: string }[] = [
  { id: 'full-time', label: 'Full-time' },
  { id: 'part-time', label: 'Part-time' },
  { id: 'self-employed', label: 'Self-employed' },
];
const MODES: { id: TrainingMode; label: string }[] = [
  { id: 'in-person', label: 'In-person' },
  { id: 'online', label: 'Online' },
  { id: 'hybrid', label: 'Hybrid' },
];

export default function DetailsTab({ userId }: { userId: string }) {
  const { profile, save } = useUserProfile(userId);
  const { chips } = useProfile();
  const [targetRole, setTargetRole] = useState(profile.targetRole);
  const [phone, setPhone] = useState(profile.phone ?? '');
  const [yoe, setYoe] = useState(profile.yearsExperience);
  const [customLanguage, setCustomLanguage] = useState('');

  const districts = districtsFor(profile.state);

  function onState(state: string) {
    const keep = districtsFor(state).includes(profile.district) ? profile.district : '';
    save({ state, district: keep });
  }

  function toggleSector(sector: string) {
    const has = profile.sectorInterest.includes(sector);
    save({
      sectorInterest: has
        ? profile.sectorInterest.filter((s) => s !== sector)
        : [...profile.sectorInterest, sector],
    });
  }

  function toggleLanguage(lang: string) {
    const has = profile.languages.includes(lang);
    save({ languages: has ? profile.languages.filter((l) => l !== lang) : [...profile.languages, lang] });
  }

  function addCustomLanguage(e: FormEvent) {
    e.preventDefault();
    const t = customLanguage.trim();
    if (t.length < 2 || profile.languages.includes(t)) return;
    save({ languages: [...profile.languages, t] });
    setCustomLanguage('');
  }

  function commitYoe() {
    const next = Math.max(0, Math.min(60, Math.round(yoe)));
    setYoe(next);
    if (next !== profile.yearsExperience) save({ yearsExperience: next });
  }

  return (
    <div className="details-grid">
      <Field label="State" htmlFor="profile-state">
        <select id="profile-state" value={profile.state} onChange={(e) => onState(e.target.value)}>
          <option value="">Select state…</option>
          {INDIA_STATES.map((s) => (
            <option key={s.state} value={s.state}>
              {s.state}
            </option>
          ))}
        </select>
      </Field>

      <Field label="District" htmlFor="profile-district">
        <select
          id="profile-district"
          value={profile.district}
          disabled={profile.state === ''}
          onChange={(e) => save({ district: e.target.value })}
        >
          <option value="">{profile.state === '' ? 'Pick a state first…' : 'Select district…'}</option>
          {districts.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Education" htmlFor="profile-education">
        <select
          id="profile-education"
          value={profile.education}
          onChange={(e) => save({ education: e.target.value as Education | '' })}
        >
          <option value="">Select…</option>
          {EDUCATIONS.map((e) => (
            <option key={e} value={e}>
              {e}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Years of experience" htmlFor="profile-yoe">
        <input
          id="profile-yoe"
          type="number"
          min={0}
          max={60}
          value={yoe}
          onChange={(e) => setYoe(Number(e.target.value))}
          onBlur={commitYoe}
        />
      </Field>

      <div className="details-full">
        <span className="ui-field-label">Sector interests</span>
        <div className="chip-pick" role="group" aria-label="Sector interests">
          {chips.map((c) => (
            <Chip
              key={c}
              label={c}
              pressed={profile.sectorInterest.includes(c)}
              onToggle={() => toggleSector(c)}
            >
              {c}
            </Chip>
          ))}
        </div>
      </div>

      <div className="details-full">
        <Field label="Target role" htmlFor="profile-role">
          <input
            id="profile-role"
            value={targetRole}
            placeholder="e.g. Solar PV Installer"
            onChange={(e) => setTargetRole(e.target.value)}
            onBlur={() => {
              if (targetRole.trim() !== profile.targetRole) save({ targetRole: targetRole.trim() });
            }}
          />
        </Field>
      </div>

      <div className="details-full">
        <span className="ui-field-label">Languages</span>
        <div className="chip-pick" role="group" aria-label="Languages">
          {Array.from(new Set([...LANGUAGES, ...profile.languages])).map((l) => (
            <Chip
              key={l}
              label={l}
              pressed={profile.languages.includes(l)}
              onToggle={() => toggleLanguage(l)}
            >
              {l}
            </Chip>
          ))}
        </div>
        <form className="add-form" onSubmit={addCustomLanguage}>
          <input
            value={customLanguage}
            onChange={(e) => setCustomLanguage(e.target.value)}
            placeholder="Another language?"
            aria-label="Custom language"
          />
          <button type="submit" className="btn btn-primary btn-sm">
            Add
          </button>
        </form>
      </div>

      <fieldset className="radio-group">
        <legend>Availability</legend>
        {AVAILABILITIES.map((a) => (
          <label key={a.id} className={`opt ${profile.availability === a.id ? 'on' : ''}`}>
            <input
              type="radio"
              name="availability"
              checked={profile.availability === a.id}
              onChange={() => save({ availability: a.id })}
            />
            <span>{a.label}</span>
          </label>
        ))}
      </fieldset>

      <fieldset className="radio-group">
        <legend>Preferred training mode</legend>
        {MODES.map((m) => (
          <label key={m.id} className={`opt ${profile.trainingMode === m.id ? 'on' : ''}`}>
            <input
              type="radio"
              name="trainingMode"
              checked={profile.trainingMode === m.id}
              onChange={() => save({ trainingMode: m.id })}
            />
            <span>{m.label}</span>
          </label>
        ))}
      </fieldset>

      <div className="details-full">
        <Field
          label="Phone (optional)"
          htmlFor="profile-phone"
          hint="Shown to others only if enabled under Privacy."
        >
          <input
            id="profile-phone"
            type="tel"
            autoComplete="tel"
            value={phone}
            placeholder="+91 …"
            onChange={(e) => setPhone(e.target.value)}
            onBlur={() => {
              if (phone.trim() !== (profile.phone ?? '')) {
                save({ phone: phone.trim() === '' ? undefined : phone.trim() });
              }
            }}
          />
        </Field>
      </div>
    </div>
  );
}
