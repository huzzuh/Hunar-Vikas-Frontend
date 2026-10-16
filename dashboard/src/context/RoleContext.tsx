import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { DEFAULT_ROLE } from '../config/roles.ts';
import type { UserRole } from '../config/roles.ts';

export type Profile = {
  name: string;
  role: string;
  place: string;
  initials: string;
};

const DEMO_PROFILES: Profile[] = [
  { name: 'Asha Patil', role: 'Artisan · Self-employed', place: 'Pune, India', initials: 'AP' },
  { name: 'Rahul Pawar', role: 'Student · Skilled Trades', place: 'Nashik, India', initials: 'RP' },
  { name: 'Meera Joshi', role: 'Home Entrepreneur', place: 'Nagpur, India', initials: 'MJ' },
];

type RoleValue = {
  profile: Profile;
  firstName: string;
  role: UserRole;
  setRole: (role: UserRole) => void;
  nextProfile: () => string;
  saveBasic: (name: string, place: string) => void;
};

const RoleContext = createContext<RoleValue | null>(null);

function initialsFor(name: string): string {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.charAt(0) ?? '';
  const last = parts.length > 1 ? (parts[parts.length - 1]?.charAt(0) ?? '') : '';
  return `${first}${last}`.toUpperCase();
}

export function RoleProvider({ children }: { children: ReactNode }) {
  const [profileIdx, setProfileIdx] = useState<number>(0);
  const [profileOverride, setProfileOverride] = useState<{ name: string; place: string } | null>(null);
  const [role, setRole] = useState<UserRole>(DEFAULT_ROLE);

  const profile = useMemo<Profile>(() => {
    const base = DEMO_PROFILES[profileIdx] ?? DEMO_PROFILES[0];
    if (base === undefined) throw new Error('No demo profiles defined');
    if (profileOverride === null) return base;
    return {
      ...base,
      name: profileOverride.name,
      place: profileOverride.place,
      initials: initialsFor(profileOverride.name),
    };
  }, [profileIdx, profileOverride]);

  const firstName = useMemo(() => profile.name.split(' ')[0] ?? profile.name, [profile]);

  const nextProfile = useCallback(() => {
    const next = (profileIdx + 1) % DEMO_PROFILES.length;
    setProfileIdx(next);
    setProfileOverride(null);
    return DEMO_PROFILES[next]?.name ?? '';
  }, [profileIdx]);

  const saveBasic = useCallback((name: string, place: string) => {
    setProfileOverride({ name, place });
  }, []);

  return (
    <RoleContext.Provider value={{ profile, firstName, role, setRole, nextProfile, saveBasic }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole(): RoleValue {
  const value = useContext(RoleContext);
  if (value === null) throw new Error('useRole must be used inside RoleProvider');
  return value;
}
