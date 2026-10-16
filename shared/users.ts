import { normalizeUserId } from './userId.ts';

/**
 * Local demo user record. No passwords are stored — auth is a frontend-only
 * mock. The userId is the stable cross-app key (login, Registration read and
 * write the same `hvi-users-v1` list; dashboard reads it plus its session).
 */
export type User = {
  userId: string;
  name: string;
  email: string;
  /** ISO timestamp of sign-up. */
  createdAt: string;
};

export const USER_LIST_KEY = 'hvi-users-v1';
export const SESSION_KEY = 'hvi-session-v1';

function storage(): Storage | null {
  try {
    if (typeof localStorage === 'undefined') return null;
    return localStorage;
  } catch {
    return null;
  }
}

function isUser(value: unknown): value is User {
  if (typeof value !== 'object' || value === null) return false;
  const u = value as Record<string, unknown>;
  return (
    typeof u['userId'] === 'string' && typeof u['name'] === 'string' && typeof u['email'] === 'string'
  );
}

/** All locally registered users (never throws; corrupt data resets to []). */
export function loadUsers(): User[] {
  const store = storage();
  if (!store) return [];
  try {
    const raw = store.getItem(USER_LIST_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isUser);
  } catch {
    return [];
  }
}

export function saveUsers(users: User[]): void {
  storage()?.setItem(USER_LIST_KEY, JSON.stringify(users));
}

export function findUserByEmail(users: User[], email: string): User | undefined {
  const needle = email.trim().toLowerCase();
  return users.find((u) => u.email.trim().toLowerCase() === needle);
}

export function findUserById(users: User[], userId: string): User | undefined {
  const needle = normalizeUserId(userId);
  return users.find((u) => normalizeUserId(u.userId) === needle);
}

export function userIdExists(users: User[], userId: string): boolean {
  return findUserById(users, userId) !== undefined;
}

/** Append unless the userId is already present. Returns the new list. */
export function addUser(users: User[], user: User): User[] {
  if (userIdExists(users, user.userId)) return users;
  return [...users, user];
}

/** Currently signed-in user for /dashboard/ to read (null when signed out). */
export function getSessionUser(): User | null {
  const store = storage();
  if (!store) return null;
  try {
    const raw = store.getItem(SESSION_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    return isUser(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function setSessionUser(user: User | null): void {
  const store = storage();
  if (!store) return;
  try {
    if (user === null) store.removeItem(SESSION_KEY);
    else store.setItem(SESSION_KEY, JSON.stringify(user));
  } catch {
    /* Demo storage must never break the app. */
  }
}
