import type {
  Availability,
  Education,
  PrivacySettings,
  Profile,
  ProfileMeta,
  ProfilePatch,
  TrainingMode,
} from './types.ts';
import { getProfileMeta } from './api/profile.service.ts';
import AboutCard from './components/AboutCard.tsx';
import PhotoUploader from './components/PhotoUploader.tsx';
import ProfileHeader from './components/ProfileHeader.tsx';
import ProfilePage from './components/ProfilePage.tsx';
import ProfileSetup from './components/ProfileSetup.tsx';
import ProfileTabs from './components/ProfileTabs.tsx';
import { getProfile, removeProfilePhoto, saveProfile, saveProfilePhoto } from './data/profiles.ts';
import { useProfile } from './hooks/useProfile.ts';
import { useProfileCompletion } from './hooks/useProfileCompletion.ts';
import { useUserProfile } from './hooks/useUserProfile.ts';

export {
  AboutCard,
  getProfile,
  getProfileMeta,
  PhotoUploader,
  ProfileHeader,
  ProfilePage,
  ProfileSetup,
  ProfileTabs,
  removeProfilePhoto,
  saveProfile,
  saveProfilePhoto,
  useProfile,
  useProfileCompletion,
  useUserProfile,
};
export type { Availability, Education, PrivacySettings, Profile, ProfileMeta, ProfilePatch, TrainingMode };
