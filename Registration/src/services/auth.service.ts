import { generateUserId } from '@shared/userId.ts';
import { addUser, findUserByEmail, loadUsers, saveUsers, setSessionUser } from '@shared/users.ts';
import type { User } from '@shared/users.ts';
import { mockCreateAccount } from './auth.mock.ts';

/**
 * Registration auth contract. The component calls this typed async function;
 * latency lives in `auth.mock.ts`. On success the user gets an immutable
 * unique userId (collision-checked against the local list), is persisted to
 * localStorage, and becomes the dashboard session.
 */
export async function register(name: string, email: string, password: string): Promise<User> {
  void password;
  const users = loadUsers();
  const existing = findUserByEmail(users, email);
  if (existing) {
    setSessionUser(existing);
    return existing;
  }
  const draft = await mockCreateAccount(name, email);
  let userId = generateUserId();
  let guard = 0;
  while (users.some((u) => u.userId === userId) && guard < 10) {
    userId = generateUserId();
    guard += 1;
  }
  const user: User = {
    userId,
    name: draft.name,
    email: draft.email,
    createdAt: new Date().toISOString(),
  };
  saveUsers(addUser(users, user));
  setSessionUser(user);
  return user;
}
