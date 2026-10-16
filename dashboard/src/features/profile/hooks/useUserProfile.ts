import { useCallback, useEffect, useState } from 'react';
import { blankProfile, getProfile, removeProfilePhoto, saveProfile, saveProfilePhoto } from '../data/profiles.ts';
import type { Profile, ProfilePatch } from '../types.ts';

/**
 * Owns the signed-in user's full Profile record. Always returns a Profile
 * (blank defaults when nothing is stored yet); persistence happens only
 * through save/savePhoto/removePhoto.
 */
export function useUserProfile(userId: string) {
  const [profile, setProfile] = useState<Profile>(() => getProfile(userId) ?? blankProfile(userId));

  useEffect(() => {
    setProfile(getProfile(userId) ?? blankProfile(userId));
  }, [userId]);

  const save = useCallback(
    (patch: ProfilePatch): Profile => {
      const next = saveProfile(userId, patch);
      setProfile(next);
      return next;
    },
    [userId],
  );

  const savePhoto = useCallback(
    (dataUrl: string): Profile => {
      const next = saveProfilePhoto(userId, dataUrl);
      setProfile(next);
      return next;
    },
    [userId],
  );

  const removePhoto = useCallback((): Profile => {
    const next = removeProfilePhoto(userId);
    setProfile(next);
    return next;
  }, [userId]);

  return { profile, save, savePhoto, removePhoto };
}
