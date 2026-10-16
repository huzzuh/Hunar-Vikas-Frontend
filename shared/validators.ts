export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const MIN_PASSWORD_LENGTH = 6;

export const MIN_NAME_LENGTH = 2;

export function isEmail(value: string): boolean {
  return EMAIL_RE.test(value.trim());
}

export function isPassword(value: string): boolean {
  return value.length >= MIN_PASSWORD_LENGTH;
}

export function isName(value: string): boolean {
  return value.trim().length >= MIN_NAME_LENGTH;
}
