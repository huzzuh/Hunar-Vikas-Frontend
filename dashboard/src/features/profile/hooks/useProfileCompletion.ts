import { useMemo } from 'react';
import { useAuth } from '../../../context/AuthContext.tsx';
import { usePassport } from '../../passport/index.ts';
import { useUserProfile } from './useUserProfile.ts';
import { useProfile } from './useProfile.ts';

/**
 * Single shared profile-completion value (0-100) computed from REAL fields:
 * basic info, photo, bio, location, education, >= 1 skill, interests/goals.
 * ProfileHeader's ring and ProfileSetup read this same hook.
 */
export function useProfileCompletion() {
  const { currentUser } = useAuth();
  const { profile } = useUserProfile(currentUser.userId);
  const { skills } = usePassport();
  const { interests, aspiration } = useProfile();

  return useMemo(() => {
    const checks = [
      profile.fullName.trim() !== '' && profile.headline.trim() !== '',
      (profile.photoUrl ?? '') !== '',
      profile.bio.trim().length >= 10,
      profile.state !== '' && profile.district !== '',
      profile.education !== '',
      skills.length >= 1,
      interests.length > 0 || aspiration !== '',
    ];
    const done = checks.filter(Boolean).length;
    return { pct: Math.round((done / checks.length) * 100), done, total: checks.length };
  }, [profile, skills.length, interests, aspiration]);
}
