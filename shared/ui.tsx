import type { ReactNode } from 'react';

/**
 * Tiny shared UI primitives in brand tokens (green/orange/cream).
 * Labelled, keyboard-accessible, no app-specific logic.
 */

export function Field({
  label,
  htmlFor,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="ui-field" htmlFor={htmlFor}>
      <span className="ui-field-label">{label}</span>
      {children}
      {hint && <small className="ui-field-hint">{hint}</small>}
    </label>
  );
}

export function Chip({
  pressed,
  onToggle,
  label,
  children,
}: {
  pressed: boolean;
  onToggle: () => void;
  label: string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      className={`pick ${pressed ? 'on' : ''}`}
      aria-pressed={pressed}
      aria-label={label}
      onClick={onToggle}
    >
      {pressed && <i className="fa-solid fa-check" aria-hidden="true" />}
      {children}
    </button>
  );
}

export function Toggle({
  checked,
  onChange,
  label,
  desc,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
  label: string;
  desc: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      className={`ui-toggle ${checked ? 'on' : ''}`}
      onClick={() => onChange(!checked)}
    >
      <span className="ui-toggle-track" aria-hidden="true">
        <span className="ui-toggle-thumb" />
      </span>
      <span className="ui-toggle-text">
        <strong>{label}</strong>
        <small>{desc}</small>
      </span>
    </button>
  );
}
