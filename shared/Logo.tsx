type LogoProps = {
  href?: string;
  tagline?: string;
  dark?: boolean;
};

/**
 * Shared Hunar Vikas India brand mark. Replaces the per-app `Logo`/`Brand`
 * copies in LandinPage, login, Registration and dashboard.
 */
export default function Logo({ href = '/', tagline = 'Skills. People. Stronger India.', dark = false }: LogoProps) {
  return (
    <a className={dark ? 'brand brand-light' : 'brand'} href={href} aria-label="Hunar Vikas India home">
      <span className="brand-mark" aria-hidden="true">
        <svg viewBox="0 0 32 32" width="30" height="30">
          <path
            d="M16 28C10 24 6 19 6 13c4 0 8 2 10 6-1-6 1-11 6-14 1 5 0 10-2 13 3-1 5-4 6-7 2 6-1 13-10 17z"
            fill={dark ? '#ffffff' : '#0E6B4F'}
          />
          <path d="M17 5c1-2 3-3 5-3 0 2-1 4-3 5-1 1-2 0-2-2z" fill="#E67E22" />
        </svg>
      </span>
      <span className="brand-text">
        <strong>Hunar Vikas India</strong>
        <small>{tagline}</small>
      </span>
    </a>
  );
}
