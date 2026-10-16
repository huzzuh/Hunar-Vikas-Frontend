import { findUserByEmail, loadUsers } from '@shared/users.ts';
import type { User } from '@shared/users.ts';

/**
 * Login mock backend. Owns ALL fake latency (900ms) so the component and
 * service stay latency-free and a real backend can replace this file only.
 * Users are looked up in the shared localStorage list written by
 * Registration, so the same userId always comes back for the same email.
 */

export function mockDelay(ms = 900): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

export async function mockSignIn(email: string): Promise<User> {
  const normalized = email.trim();
  await mockDelay(900);
  const user = findUserByEmail(loadUsers(), normalized);
  if (!user) throw new Error('No account found for this email. Please register first.');
  return user;
}

export async function mockSendResetLink(email: string): Promise<void> {
  const normalized = email.trim();
  void normalized;
  await mockDelay(900);
}
