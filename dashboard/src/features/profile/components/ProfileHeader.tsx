import { copyText } from '@shared/clipboard.ts';
import { useAuth } from '../../../context/AuthContext.tsx';
import { useToastContext } from '../../../context/ToastContext.tsx';
import { useCountUp } from '../../../hooks/useCountUp.ts';
import { useProfileCompletion } from '../hooks/useProfileCompletion.ts';
import { useUserProfile } from '../hooks/useUserProfile.ts';
import type { Availability } from '../types.ts';
import PhotoUploader from './PhotoUploader.tsx';

const AVAILABILITY_LABEL: Record<Availability, string> = {
  'full-time': 'Full-time',
  'part-time': 'Part-time',
  'self-employed': 'Self-employed',
};

function memberSince(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' });
}

export default function ProfileHeader({ userId }: { userId: string }) {
  const { currentUser } = useAuth();
  const { profile } = useUserProfile(userId);
  const { notify } = useToastContext();
  const { pct } = useProfileCompletion();
  const animated = useCountUp(pct);
  const R = 26;
  const CIRC = 2 * Math.PI * R;

  const name = profile.fullName !== '' ? profile.fullName : currentUser.name;
  const location = profile.state !== '' ? `${profile.district || '—'}, ${profile.state}` : 'India';
  const since = memberSince(profile.createdAt);

  async function copyId(): Promise<void> {
    const ok = await copyText(currentUser.userId);
    notify(ok ? 'ID copied' : 'Copy failed — long-press the ID to copy it');
  }

  return (
    <section className="panel reveal profile-header" aria-label="Profile header">
      <PhotoUploader userId={userId} displayName={name} />
      <div className="profile-id">
        <strong>{name}</strong>
        {profile.headline !== '' && <span className="profile-headline">{profile.headline}</span>}
        <small className="profile-sub">
          {AVAILABILITY_LABEL[profile.availability]} · {location}
        </small>
        <span className="id-chip-row">
          <code className="user-id" title="Your Hunar Vikas user ID">
            {currentUser.userId}
          </code>
          <button type="button" className="btn btn-outline btn-sm" onClick={copyId}>
            <i className="fa-regular fa-copy" aria-hidden="true" /> Copy ID
          </button>
        </span>
        {since !== '' && <small className="profile-sub">Member since {since}</small>}
      </div>
      <div className="profile-ring" role="img" aria-label={`Profile ${pct}% complete`}>
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <circle cx="32" cy="32" r={R} fill="none" stroke="#e6f2ea" strokeWidth="8" />
          <circle
            cx="32"
            cy="32"
            r={R}
            fill="none"
            stroke="#0E6B4F"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={CIRC}
            strokeDashoffset={CIRC - (CIRC * animated) / 100}
            transform="rotate(-90 32 32)"
          />
        </svg>
        <b>{Math.round(animated)}%</b>
        <small>complete</small>
      </div>
    </section>
  );
}
