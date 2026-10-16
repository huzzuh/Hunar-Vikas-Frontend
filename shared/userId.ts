/**
 * Hunar Vikas India unique user ID.
 *
 * Format: "HVI-XXXX-XXXX-C"
 * - "HVI" fixed prefix.
 * - X = 8 random chars from Crockford Base32 (0-9, A-Z without I, L, O, U).
 * - C = Luhn-mod-32 check character computed over the 8 payload chars.
 *
 * The ID carries NO personal data. It is immutable once created and must
 * never be regenerated for an existing user. All persistence lives in the
 * callers (localStorage user list); this module is pure logic with no I/O.
 */

/** Crockford Base32: 0-9 + A-Z minus I, L, O, U (32 symbols). */
export const USER_ID_ALPHABET = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';

export const USER_ID_PREFIX = 'HVI';

const PAYLOAD_LEN = 8;
const BASE = USER_ID_ALPHABET.length;

function alphabetIndex(ch: string): number {
  return USER_ID_ALPHABET.indexOf(ch);
}

function secureRandomBytes(count: number): Uint8Array {
  const holder = globalThis as unknown as {
    crypto?: { getRandomValues?: (array: Uint8Array) => Uint8Array };
  };
  const getRandomValues = holder.crypto?.getRandomValues?.bind(holder.crypto);
  if (!getRandomValues) throw new Error('Secure random generator unavailable (crypto.getRandomValues required)');
  return getRandomValues(new Uint8Array(count));
}

/**
 * Luhn-mod-N digit sum over alphabet values, scanning right to left with an
 * alternating 2/1 factor. Used to derive the check character; validation
 * recomputes the check over the payload and compares (detects every
 * single-character substitution — see note on computeCheckChar).
 */
function luhnModSum(chars: string): number {
  let sum = 0;
  let factor = 2;
  for (let i = chars.length - 1; i >= 0; i -= 1) {
    const code = alphabetIndex(chars.charAt(i));
    if (code < 0) return -1;
    let addend = factor * code;
    factor = factor === 2 ? 1 : 2;
    addend = Math.floor(addend / BASE) + (addend % BASE);
    sum += addend;
  }
  return sum;
}

function computeCheckChar(payload: string): string {
  const sum = luhnModSum(payload);
  const check = (BASE - (sum % BASE)) % BASE;
  const ch = USER_ID_ALPHABET.charAt(check);
  return ch === '' ? '0' : ch;
}

/**
 * Uppercase, strip spaces/dashes, fix common look-alikes in the payload
 * (O->0, I/L->1). The HVI prefix is preserved as-is (a look-alike HV1/HVO
 * prefix is also accepted as HVI).
 */
export function normalizeUserId(id: string): string {
  const stripped = id
    .toUpperCase()
    .replace(/[\s-]+/g, '');
  const prefix = stripped.slice(0, 3);
  const rest = stripped
    .slice(3)
    .replace(/O/g, '0')
    .replace(/I/g, '1')
    .replace(/L/g, '1');
  const normPrefix = prefix === 'HVI' || prefix === 'HV1' || prefix === 'HVO' ? 'HVI' : prefix;
  return normPrefix + rest;
}

/** True when the value parses as HVI + 8 payload chars + matching check char. */
export function isValidUserId(id: unknown): boolean {
  if (typeof id !== 'string') return false;
  const clean = normalizeUserId(id);
  if (!clean.startsWith(USER_ID_PREFIX)) return false;
  if (clean.length !== USER_ID_PREFIX.length + PAYLOAD_LEN + 1) return false;
  const body = clean.slice(USER_ID_PREFIX.length);
  for (const ch of body) {
    if (alphabetIndex(ch) < 0) return false;
  }
  const payload = body.slice(0, PAYLOAD_LEN);
  return computeCheckChar(payload) === body.charAt(PAYLOAD_LEN);
}

/** Normalize then group as "HVI-XXXX-XXXX-C". Returns the input when unparseable. */
export function formatUserId(raw: string): string {
  const clean = normalizeUserId(raw);
  if (!clean.startsWith(USER_ID_PREFIX)) return raw;
  if (clean.length !== USER_ID_PREFIX.length + PAYLOAD_LEN + 1) return raw;
  return `${clean.slice(0, 3)}-${clean.slice(3, 7)}-${clean.slice(7, 11)}-${clean.slice(11)}`;
}

/** Generate a fresh random ID. Uniqueness vs stored users is the caller's job. */
export function generateUserId(): string {
  const bytes = secureRandomBytes(PAYLOAD_LEN);
  let payload = '';
  for (const b of bytes) {
    payload += USER_ID_ALPHABET.charAt(b % BASE);
  }
  return formatUserId(`${USER_ID_PREFIX}${payload}${computeCheckChar(payload)}`);
}

/**
 * Dev-time round-trip assertions. Returns a list of failure messages (empty
 * when all pass). Auto-runs in Vite dev only; never throws, never ships
 * behavior into production builds.
 */
export function runUserIdSelfChecks(): string[] {
  const failures: string[] = [];
  const check = (name: string, ok: boolean) => {
    if (!ok) failures.push(name);
  };

  for (let i = 0; i < 50; i += 1) {
    const id = generateUserId();
    check(`round-trip #${i} (${id})`, isValidUserId(id) && formatUserId(id) === id);
  }

  const sample = generateUserId();
  const flat = normalizeUserId(sample);
  for (let i = 0; i < flat.length; i += 1) {
    const tampered = `${flat.slice(0, i)}${flat.charAt(i) === '0' ? '1' : '0'}${flat.slice(i + 1)}`;
    check(`tamper at ${i} rejected`, !isValidUserId(tampered));
  }

  check('lowercase accepted', isValidUserId(sample.toLowerCase()));
  check('spaces/dashes accepted', isValidUserId(sample.replace(/-/g, '  - ')));
  check('O maps to 0', normalizeUserId('HVI-OOOO-OOOO-O').includes('0'));
  check('I/L map to 1', normalizeUserId('hvi-illi-illi-i').includes('1'));
  check('rejects empty', !isValidUserId(''));
  check('rejects non-string', !isValidUserId(null));
  check('rejects bad prefix', !isValidUserId('XYZ-1234-5678-9'));
  check('rejects short', !isValidUserId('HVI-1234'));
  check('rejects U (not in alphabet)', !isValidUserId('HVI-UUUU-UUUU-U'));

  return failures;
}

try {
  const env = (import.meta as unknown as { env?: { DEV?: boolean } }).env;
  if (env?.DEV === true) {
    const failures = runUserIdSelfChecks();
    for (const failure of failures) {
      console.error(`[userId self-check] ${failure}`);
    }
  }
} catch {
  /* Self-checks must never break the app. */
}
