import { setSessionUser } from '@shared/users.ts';
import type { User } from '@shared/users.ts';
import { mockSendResetLink, mockSignIn } from './auth.mock.ts';

/**
 * Login auth contract. The component calls these typed async functions;
 * latency + lookup live in `auth.mock.ts`. Signing in stores the session in
 * localStorage so /dashboard/ can read the same user (incl. userId).
 */
export async function signIn(email: string, password: string): Promise<User> {
  void password;
  const user = await mockSignIn(email);
  setSessionUser(user);
  return user;
}

export async function sendResetLink(email: string): Promise<void> {
  await mockSendResetLink(email);
}
