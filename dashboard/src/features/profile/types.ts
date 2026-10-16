export type Education = 'Below 10th' | '10th' | '12th' | 'ITI/Diploma' | 'Graduate' | 'Postgraduate';

export type Availability = 'full-time' | 'part-time' | 'self-employed';

export type TrainingMode = 'in-person' | 'online' | 'hybrid';

export type PrivacySettings = {
  showPhone: boolean;
  visibleToEmployers: boolean;
  shareAnonymisedData: boolean;
};

export type Profile = {
  userId: string;
  fullName: string;
  headline: string;
  /** Max 300 chars, enforced in the UI. */
  bio: string;
  /** Square 256x256 data-URL written by PhotoUploader. */
  photoUrl?: string;
  state: string;
  district: string;
  education: Education | '';
  yearsExperience: number;
  sectorInterest: string[];
  targetRole: string;
  languages: string[];
  availability: Availability;
  trainingMode: TrainingMode;
  phone?: string;
  privacy: PrivacySettings;
  createdAt: string;
  updatedAt: string;
};

export type ProfileMeta = {
  interestOptions: string[];
  aspirations: string[];
  modes: string[];
};

/** Patch for saveProfile: null photoUrl deletes the stored photo. */
export type ProfilePatch = Partial<
  Omit<Profile, 'userId' | 'createdAt' | 'updatedAt' | 'privacy' | 'photoUrl'>
> & {
  privacy?: Partial<PrivacySettings>;
  photoUrl?: string | null;
};
