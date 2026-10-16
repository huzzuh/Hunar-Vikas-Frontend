/**
 * Registration mock backend. Owns ALL fake latency (900ms) so the component
 * and service stay latency-free and a real backend can replace this file only.
 * Identity (userId) and persistence live in the service + shared store.
 */

export function mockDelay(ms = 900): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

export type MockAccountDraft = {
  name: string;
  email: string;
};

export async function mockCreateAccount(name: string, email: string): Promise<MockAccountDraft> {
  const normalizedName = name.trim();
  const normalizedEmail = email.trim();
  await mockDelay(900);
  return { name: normalizedName, email: normalizedEmail };
}
