/**
 * Mock switch. `VITE_USE_MOCK` defaults to true so the dashboard runs on
 * fixtures with zero backend. Set `VITE_USE_MOCK=false` to hit real fetch
 * endpoints. Services read this flag; components never do.
 */
export const USE_MOCK: boolean = (import.meta.env.VITE_USE_MOCK ?? 'true') !== 'false';

export const API_URL: string = import.meta.env.VITE_API_URL ?? '';

export function mockDelay(ms = 250): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}
