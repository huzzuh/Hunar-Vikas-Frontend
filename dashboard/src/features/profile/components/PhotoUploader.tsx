import { useEffect, useRef, useState } from 'react';
import type { ChangeEvent } from 'react';
import { useUserProfile } from '../hooks/useUserProfile.ts';

const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_BYTES = 2 * 1024 * 1024;
const SIZE = 256;

function initialsOf(name: string): string {
  const parts = name.trim().split(/\s+/).filter((p) => p !== '');
  const first = parts[0]?.charAt(0) ?? '?';
  const last = parts.length > 1 ? (parts[parts.length - 1]?.charAt(0) ?? '') : '';
  return `${first}${last}`.toUpperCase();
}

/** Square-crop + resize to 256x256 JPEG data-URL via canvas. */
function fileToSquareDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      try {
        const side = Math.min(img.naturalWidth, img.naturalHeight);
        if (side < 1) throw new Error('That image has no usable pixels.');
        const canvas = document.createElement('canvas');
        canvas.width = SIZE;
        canvas.height = SIZE;
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Photo editing is unavailable in this browser.');
        ctx.drawImage(img, (img.naturalWidth - side) / 2, (img.naturalHeight - side) / 2, side, side, 0, 0, SIZE, SIZE);
        resolve(canvas.toDataURL('image/jpeg', 0.85));
      } catch (err) {
        reject(err instanceof Error ? err : new Error('Could not process that photo.'));
      } finally {
        URL.revokeObjectURL(url);
      }
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Could not read that image file.'));
    };
    img.src = url;
  });
}

export default function PhotoUploader({ userId, displayName }: { userId: string; displayName: string }) {
  const { profile, savePhoto, removePhoto } = useUserProfile(userId);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [working, setWorking] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setPreview(null);
    setError(null);
  }, [userId, profile.photoUrl]);

  async function onFile(e: ChangeEvent<HTMLInputElement>): Promise<void> {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setError(null);
    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError('Please choose a JPG, PNG or WebP photo.');
      return;
    }
    if (file.size > MAX_BYTES) {
      setError('That photo is over 2 MB. Please pick a smaller one.');
      return;
    }
    setWorking(true);
    try {
      setPreview(await fileToSquareDataUrl(file));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not process that photo.');
    } finally {
      setWorking(false);
    }
  }

  const shown = preview ?? profile.photoUrl ?? null;

  return (
    <div className="photo-uploader">
      <span className="avatar profile-ava" aria-hidden="true">
        {shown ? (
          <img src={shown} alt="" />
        ) : (
          initialsOf(displayName)
        )}
      </span>
      <button
        type="button"
        className="avatar-edit-btn"
        aria-label={profile.photoUrl ? 'Change profile photo' : 'Add profile photo'}
        onClick={() => inputRef.current?.click()}
      >
        <i className="fa-solid fa-camera" aria-hidden="true" />
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="sr-only"
        aria-label="Choose a profile photo"
        onChange={onFile}
      />
      {working && <small className="photo-note">Preparing preview…</small>}
      {error && (
        <small className="photo-err" role="alert">
          {error}
        </small>
      )}
      {preview && !working && (
        <div className="photo-actions">
          <button type="button" className="btn btn-primary btn-sm" onClick={() => savePhoto(preview)}>
            <i className="fa-solid fa-check" aria-hidden="true" /> Save photo
          </button>
          <button type="button" className="btn btn-outline btn-sm" onClick={() => setPreview(null)}>
            Cancel
          </button>
        </div>
      )}
      {!preview && profile.photoUrl && (
        <div className="photo-actions">
          <button type="button" className="btn btn-outline btn-sm" onClick={() => removePhoto()}>
            <i className="fa-solid fa-trash" aria-hidden="true" /> Remove photo
          </button>
        </div>
      )}
    </div>
  );
}
