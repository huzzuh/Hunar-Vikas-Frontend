import { DEMO_USER_IDS } from '../../../context/AuthContext.tsx';
import type { Profile, ProfilePatch } from '../types.ts';

/**
 * Profile persistence: one localStorage record per userId. Components never
 * touch storage directly — only hooks call these helpers.
 */

const KEY = 'hvi-profiles-v1';

function now(): string {
  return new Date().toISOString();
}

function loadAll(): Record<string, Profile> {
  try {
    if (typeof localStorage === 'undefined') return {};
    const raw = localStorage.getItem(KEY);
    if (!raw) return {};
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== 'object' || parsed === null) return {};
    return parsed as Record<string, Profile>;
  } catch {
    return {};
  }
}

function saveAll(all: Record<string, Profile>): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(all));
  } catch {
    /* Demo storage (photo data-URLs can hit quota) must never break the app. */
  }
}

export function blankProfile(userId: string): Profile {
  const stamp = now();
  return {
    userId,
    fullName: '',
    headline: '',
    bio: '',
    state: '',
    district: '',
    education: '',
    yearsExperience: 0,
    sectorInterest: [],
    targetRole: '',
    languages: [],
    availability: 'full-time',
    trainingMode: 'hybrid',
    privacy: { showPhone: false, visibleToEmployers: true, shareAnonymisedData: true },
    createdAt: stamp,
    updatedAt: stamp,
  };
}

function demoSeed(userId: string): Profile | null {
  const stamp = '2026-01-15T09:00:00.000Z';
  if (userId === DEMO_USER_IDS.asha) {
    return {
      userId,
      fullName: 'Asha Patil',
      headline: 'Pottery artisan & home entrepreneur',
      bio: 'Potter from Pune selling handmade diyas, planters and decor at local melas and through WhatsApp. Learning glazing, packaging and online selling to grow the home business.',
      state: 'Maharashtra',
      district: 'Pune',
      education: '12th',
      yearsExperience: 6,
      sectorInterest: ['Handicrafts', 'Green Jobs'],
      targetRole: 'Craft Entrepreneur',
      languages: ['Marathi', 'Hindi'],
      availability: 'self-employed',
      trainingMode: 'hybrid',
      phone: '+91 98220 00001',
      privacy: { showPhone: true, visibleToEmployers: true, shareAnonymisedData: true },
      createdAt: stamp,
      updatedAt: stamp,
    };
  }
  if (userId === DEMO_USER_IDS.rahul) {
    return {
      userId,
      fullName: 'Rahul Pawar',
      headline: 'ITI trainee · electrical & solar',
      bio: 'ITI electrical student from Nashik training in wiring and rooftop solar installation. Looking for an apprenticeship and supervisor certification.',
      state: 'Maharashtra',
      district: 'Nashik',
      education: 'ITI/Diploma',
      yearsExperience: 1,
      sectorInterest: ['Green Jobs', 'Construction'],
      targetRole: 'Solar PV Installer',
      languages: ['Marathi', 'Hindi', 'English'],
      availability: 'full-time',
      trainingMode: 'in-person',
      privacy: { showPhone: false, visibleToEmployers: true, shareAnonymisedData: true },
      createdAt: '2026-02-02T09:00:00.000Z',
      updatedAt: '2026-02-02T09:00:00.000Z',
    };
  }
  if (userId === DEMO_USER_IDS.meera) {
    return {
      userId,
      fullName: 'Meera Joshi',
      headline: 'Home chef · tiffin & festive sweets',
      bio: 'Home entrepreneur from Nagpur running a tiffin service and festive sweets. Wants food-processing certification, FSSAI registration and better packaging.',
      state: 'Maharashtra',
      district: 'Nagpur',
      education: 'Graduate',
      yearsExperience: 4,
      sectorInterest: ['Food Processing'],
      targetRole: 'Food Business Owner',
      languages: ['Hindi', 'Marathi'],
      availability: 'self-employed',
      trainingMode: 'online',
      phone: '+91 98220 00003',
      privacy: { showPhone: true, visibleToEmployers: true, shareAnonymisedData: false },
      createdAt: '2026-03-10T09:00:00.000Z',
      updatedAt: '2026-03-10T09:00:00.000Z',
    };
  }
  return null;
}

/** Stored profile, demo seed for the 3 demo IDs, or null. Never writes. */
export function getProfile(userId: string): Profile | null {
  const found = loadAll()[userId];
  if (found) return found;
  return demoSeed(userId);
}

/** Merge a patch over the stored (or blank/seed) profile and persist it. */
export function saveProfile(userId: string, patch: ProfilePatch): Profile {
  const all = loadAll();
  const base = all[userId] ?? getProfile(userId) ?? blankProfile(userId);
  const { photoUrl, privacy, ...rest } = patch;
  const next: Profile = {
    ...base,
    ...rest,
    userId: base.userId,
    createdAt: base.createdAt,
    privacy: { ...base.privacy, ...privacy },
    updatedAt: now(),
  };
  if (photoUrl === undefined) {
    next.photoUrl = base.photoUrl;
  } else if (photoUrl === null) {
    delete next.photoUrl;
  } else {
    next.photoUrl = photoUrl;
  }
  all[userId] = next;
  saveAll(all);
  return next;
}

export function saveProfilePhoto(userId: string, dataUrl: string): Profile {
  return saveProfile(userId, { photoUrl: dataUrl });
}

export function removeProfilePhoto(userId: string): Profile {
  return saveProfile(userId, { photoUrl: null });
}
