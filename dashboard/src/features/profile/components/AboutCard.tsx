import { useState } from 'react';
import { useUserProfile } from '../hooks/useUserProfile.ts';

const HEADLINE_MAX = 80;
const BIO_MAX = 300;

export default function AboutCard({ userId }: { userId: string }) {
  const { profile, save } = useUserProfile(userId);
  const [editing, setEditing] = useState(false);
  const [headline, setHeadline] = useState('');
  const [bio, setBio] = useState('');
  const [error, setError] = useState<string | null>(null);

  function startEdit() {
    setHeadline(profile.headline);
    setBio(profile.bio);
    setError(null);
    setEditing(true);
  }

  function onSave() {
    if (headline.trim() === '') {
      setError('Please add a one-line headline, e.g. your trade or goal.');
      return;
    }
    if (bio.length > BIO_MAX) {
      setError(`Bio is ${bio.length}/${BIO_MAX} — please shorten it.`);
      return;
    }
    save({ headline: headline.trim(), bio: bio.trim() });
    setEditing(false);
    setError(null);
  }

  return (
    <section className="panel reveal" aria-label="About">
      <div className="panel-head tight">
        <span className="panel-title">
          <strong>About</strong>
          <small>Tell employers who you are in a line or two.</small>
        </span>
        {!editing && (
          <button type="button" className="link sm" onClick={startEdit}>
            <i className="fa-solid fa-pen" aria-hidden="true" /> Edit
          </button>
        )}
      </div>
      {!editing ? (
        <>
          {profile.headline !== '' && <p className="about-headline">{profile.headline}</p>}
          {profile.bio !== '' ? (
            <p className="about-bio">{profile.bio}</p>
          ) : (
            <p className="empty">No bio yet — add one so employers know your story.</p>
          )}
        </>
      ) : (
        <div className="about-edit">
          <label className="ui-field" htmlFor="about-headline">
            <span className="ui-field-label">Headline</span>
            <input
              id="about-headline"
              value={headline}
              maxLength={HEADLINE_MAX}
              placeholder="e.g. Pottery artisan & home entrepreneur"
              onChange={(e) => setHeadline(e.target.value)}
            />
          </label>
          <label className="ui-field" htmlFor="about-bio">
            <span className="ui-field-label">Bio</span>
            <textarea
              id="about-bio"
              className="bio-area"
              rows={4}
              maxLength={BIO_MAX}
              value={bio}
              placeholder="What you do, your experience, what you are looking for…"
              onChange={(e) => setBio(e.target.value)}
            />
          </label>
          <small className={`char-count ${bio.length >= BIO_MAX ? 'full' : ''}`} aria-live="polite">
            {bio.length}/{BIO_MAX}
          </small>
          {error && (
            <p className="field-err" role="alert">
              {error}
            </p>
          )}
          <div className="about-actions">
            <button type="button" className="btn btn-primary btn-sm" onClick={onSave}>
              <i className="fa-solid fa-check" aria-hidden="true" /> Save
            </button>
            <button
              type="button"
              className="btn btn-outline btn-sm"
              onClick={() => {
                setEditing(false);
                setError(null);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
