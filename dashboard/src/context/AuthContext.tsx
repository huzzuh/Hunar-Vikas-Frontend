import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { getSessionUser, setSessionUser } from '@shared/users.ts';
import type { User } from '@shared/users.ts';
import { useRole } from './RoleContext.tsx';

/**
 * Dashboard auth. Frontend-only: the signed-in user is the localStorage
 * session written by login/Registration. With no session, the currently
 * selected demo profile is exposed instead, so every screen always has a
 * stable userId to key per-user data (profile, growth) in Phase B/C.
 */

/** Fixed, checksum-valid demo IDs (verified with shared/userId.check.mjs). */
export const DEMO_USER_IDS = {
  asha: 'HVI-0VVD-TJY9-5',
  rahul: 'HVI-YNWS-JQYJ-4',
  meera: 'HVI-Q0TB-YJHJ-0',
} as const;

export const DEMO_USERS: User[] = [
  { userId: DEMO_USER_IDS.asha, name: 'Asha Patil', email: 'asha.patil@example.in', createdAt: '2026-01-15T09:00:00.000Z' },
  { userId: DEMO_USER_IDS.rahul, name: 'Rahul Pawar', email: 'rahul.pawar@example.in', createdAt: '2026-02-02T09:00:00.000Z' },
  { userId: DEMO_USER_IDS.meera, name: 'Meera Joshi', email: 'meera.joshi@example.in', createdAt: '2026-03-10T09:00:00.000Z' },
];

const FALLBACK_USER: User = DEMO_USERS[0] ?? {
  userId: DEMO_USER_IDS.asha,
  name: 'Asha Patil',
  email: 'asha.patil@example.in',
  createdAt: '2026-01-15T09:00:00.000Z',
};

function demoForProfileName(name: string): User {
  const found = DEMO_USERS.find((u) => u.name === name);
  return found ?? FALLBACK_USER;
}

type AuthValue = {
  /** Session user when signed in, otherwise the selected demo profile. */
  currentUser: User;
  /** Raw session (null when signed out / never signed in). */
  sessionUser: User | null;
  demoUsers: User[];
  signOut: () => void;
  refresh: () => void;
};

const AuthContext = createContext<AuthValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { profile } = useRole();
  const [sessionUser, setSession] = useState<User | null>(() => getSessionUser());

  const refresh = useCallback(() => {
    setSession(getSessionUser());
  }, []);

  const signOut = useCallback(() => {
    setSessionUser(null);
    setSession(null);
  }, []);

  const currentUser = useMemo<User>(
    () => sessionUser ?? demoForProfileName(profile.name),
    [sessionUser, profile.name],
  );

  const value = useMemo<AuthValue>(
    () => ({ currentUser, sessionUser, demoUsers: DEMO_USERS, signOut, refresh }),
    [currentUser, sessionUser, signOut, refresh],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthValue {
  const value = useContext(AuthContext);
  if (value === null) throw new Error('useAuth must be used inside AuthProvider');
  return value;
}
