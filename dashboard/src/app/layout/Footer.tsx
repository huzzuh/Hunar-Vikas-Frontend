import Logo from '@shared/Logo.tsx';

export default function Footer() {
  return (
    <footer className="footer">
      <Logo tagline="Every Skill Deserves an Opportunity." />
      <p>
        © 2026 Hunar Vikas India — India pilot · <span className="allow-select">hello@hunarvikas.in</span>
      </p>
      <p className="foot-links">
        <a href="/">Home</a> · <a href="/login/">Sign In</a> · <a href="/registration/">Register</a>
      </p>
    </footer>
  );
}
