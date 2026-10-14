import { useState } from 'react'
import type { FormEvent } from 'react'
import './index.css'

type Role = 'Citizen' | 'Artisan' | 'Employer' | 'Training Partner'

const ROLES: { id: Role; icon: string; desc: string }[] = [
  { id: 'Citizen', icon: 'fa-solid fa-user', desc: 'Jobs & training' },
  { id: 'Artisan', icon: 'fa-solid fa-palette', desc: 'Showcase craft' },
  { id: 'Employer', icon: 'fa-solid fa-briefcase', desc: 'Hire talent' },
  { id: 'Training Partner', icon: 'fa-solid fa-person-chalkboard', desc: 'Offer courses' },
]

const STEPS = [
  { title: 'Tell us who you are', desc: 'Pick the role that fits you best.' },
  { title: 'Verify your email', desc: 'One quick code and you are in.' },
  { title: 'Explore & grow', desc: 'Skills, training and opportunities.' },
]

function Logo() {
  return (
    <a className="brand" href="/" aria-label="Hunar Vikas India home">
      <span className="brand-mark" aria-hidden="true">
        <svg viewBox="0 0 32 32" width="30" height="30">
          <path
            d="M16 28C10 24 6 19 6 13c4 0 8 2 10 6-1-6 1-11 6-14 1 5 0 10-2 13 3-1 5-4 6-7 2 6-1 13-10 17z"
            fill="#0E6B4F"
          />
          <path d="M17 5c1-2 3-3 5-3 0 2-1 4-3 5-1 1-2 0-2-2z" fill="#E67E22" />
        </svg>
      </span>
      <span className="brand-text">
        <strong>Hunar Vikas India</strong>
        <small>Skills. People. Stronger Maharashtra.</small>
      </span>
    </a>
  )
}

function RegisterVisual() {
  return (
    <aside className="brand-visual hero-fade" aria-label="Why join Hunar Vikas India">
      <div className="visual-inner">
        <p className="eyebrow">JOIN HUNAR VIKAS INDIA</p>
        <h2>
          Your skills deserve
          <br />
          <span className="light">an opportunity.</span>
        </h2>
        <ol className="steps">
          {STEPS.map((s, i) => (
            <li key={s.title}>
              <span className="step-num" aria-hidden="true">
                {i + 1}
              </span>
              <span>
                <strong>{s.title}</strong>
                <small>{s.desc}</small>
              </span>
            </li>
          ))}
        </ol>
        <p className="visual-note">
          <i className="fa-solid fa-shield-halved" aria-hidden="true" /> Free to join · Maharashtra pilot
        </p>
      </div>
    </aside>
  )
}

type Errors = { name?: string; email?: string; password?: string; confirm?: string; agree?: string }

export default function App() {
  const [role, setRole] = useState<Role>('Citizen')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [agree, setAgree] = useState(false)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')

  function validate(): boolean {
    const next: Errors = {}
    if (name.trim().length < 2) {
      next.name = 'Enter your full name.'
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      next.email = 'Enter a valid email address.'
    }
    if (password.length < 6) {
      next.password = 'Password must be at least 6 characters.'
    }
    if (confirm !== password || confirm.length === 0) {
      next.confirm = 'Passwords do not match.'
    }
    if (!agree) {
      next.agree = 'Please accept the Terms to continue.'
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (status === 'loading') return
    if (!validate()) return
    setStatus('loading')
    window.setTimeout(() => setStatus('success'), 900)
  }

  function reset() {
    setStatus('idle')
    setName('')
    setEmail('')
    setPassword('')
    setConfirm('')
    setAgree(false)
    setErrors({})
  }

  return (
    <>
      <header className="header">
        <div className="container header-inner">
          <Logo />
          <div className="header-actions">
            <span className="header-note hide-sm">
              <i className="fa-solid fa-shield-halved" aria-hidden="true" /> Secure sign-up
            </span>
            <a href="/login/" className="btn btn-outline">
              Sign In
            </a>
          </div>
        </div>
      </header>

      <main className="container login-wrap">
        <div className="login-grid">
          <RegisterVisual />

          <section className="login-card hero-fade" style={{ animationDelay: '150ms' }} aria-label="Create account">
            {status === 'success' ? (
              <div className="success" role="status">
                <span className="success-ico">
                  <i className="fa-solid fa-circle-check" aria-hidden="true" />
                </span>
                <div>
                  <strong>Welcome, {name.trim()}!</strong>
                  <p>
                    Your {role} account request is in. Demo only — no backend yet, so nothing was saved. <br />
                    <span className="muted">
                      {email.trim()} · Maharashtra
                    </span>
                  </p>
                  <div className="success-actions">
                    <a href="/login/" className="btn btn-primary">
                      Go to Sign In →
                    </a>
                    <button type="button" className="btn btn-outline" onClick={reset}>
                      Register another account
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="login-head">
                  <h2>Create your account</h2>
                  <p>Join Hunar Vikas India and start your skills journey.</p>
                </div>

                <div className="role-group" role="radiogroup" aria-label="I am joining as">
                  {ROLES.map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      role="radio"
                      aria-checked={role === r.id}
                      className={`role-btn ${role === r.id ? 'active' : ''}`}
                      onClick={() => setRole(r.id)}
                    >
                      <i className={r.icon} aria-hidden="true" />
                      <span>
                        <strong>{r.id}</strong>
                        <small>{r.desc}</small>
                      </span>
                    </button>
                  ))}
                </div>

                <form onSubmit={onSubmit} noValidate>
                  <div className="field">
                    <label htmlFor="name">Full name</label>
                    <div className={`control ${errors.name ? 'invalid' : ''}`}>
                      <i className="fa-regular fa-user" aria-hidden="true" />
                      <input
                        id="name"
                        type="text"
                        autoComplete="name"
                        placeholder="Your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? 'name-err' : undefined}
                      />
                    </div>
                    {errors.name && (
                      <small id="name-err" className="err" role="alert">
                        {errors.name}
                      </small>
                    )}
                  </div>

                  <div className="field">
                    <label htmlFor="email">Email address</label>
                    <div className={`control ${errors.email ? 'invalid' : ''}`}>
                      <i className="fa-regular fa-envelope" aria-hidden="true" />
                      <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.in"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? 'email-err' : undefined}
                      />
                    </div>
                    {errors.email && (
                      <small id="email-err" className="err" role="alert">
                        {errors.email}
                      </small>
                    )}
                  </div>

                  <div className="field">
                    <label htmlFor="password">Password</label>
                    <div className={`control ${errors.password ? 'invalid' : ''}`}>
                      <i className="fa-solid fa-lock" aria-hidden="true" />
                      <input
                        id="password"
                        type={showPw ? 'text' : 'password'}
                        autoComplete="new-password"
                        placeholder="At least 6 characters"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        aria-invalid={Boolean(errors.password)}
                        aria-describedby={errors.password ? 'pw-err' : undefined}
                      />
                      <button
                        type="button"
                        className="pw-toggle"
                        onClick={() => setShowPw((v) => !v)}
                        aria-label={showPw ? 'Hide password' : 'Show password'}
                      >
                        <i
                          className={showPw ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye'}
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                    {errors.password && (
                      <small id="pw-err" className="err" role="alert">
                        {errors.password}
                      </small>
                    )}
                  </div>

                  <div className="field">
                    <label htmlFor="confirm">Confirm password</label>
                    <div className={`control ${errors.confirm ? 'invalid' : ''}`}>
                      <i className="fa-solid fa-lock" aria-hidden="true" />
                      <input
                        id="confirm"
                        type={showPw ? 'text' : 'password'}
                        autoComplete="new-password"
                        placeholder="Repeat your password"
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                        aria-invalid={Boolean(errors.confirm)}
                        aria-describedby={errors.confirm ? 'confirm-err' : undefined}
                      />
                    </div>
                    {errors.confirm && (
                      <small id="confirm-err" className="err" role="alert">
                        {errors.confirm}
                      </small>
                    )}
                  </div>

                  <label className="remember">
                    <input
                      type="checkbox"
                      checked={agree}
                      onChange={(e) => setAgree(e.target.checked)}
                    />
                    <span className="checkmark" aria-hidden="true">
                      {agree && <i className="fa-solid fa-check" />}
                    </span>
                    I agree to the Terms &amp; Privacy Policy
                  </label>
                  {errors.agree && (
                    <small className="err agree-err" role="alert">
                      {errors.agree}
                    </small>
                  )}

                  <button
                    type="submit"
                    className="btn btn-primary btn-lg btn-full"
                    disabled={status === 'loading'}
                  >
                    {status === 'loading' ? (
                      <>
                        <span className="spinner" aria-hidden="true" /> Creating account…
                      </>
                    ) : (
                      <>Create Account →</>
                    )}
                  </button>
                </form>

                <p className="signup">
                  Already have an account? <a href="/login/">Sign in →</a>
                </p>
              </>
            )}

            <ul className="login-trust">
              <li>
                <i className="fa-solid fa-leaf" aria-hidden="true" /> Inclusive livelihoods
              </li>
              <li>
                <i className="fa-solid fa-handshake" aria-hidden="true" /> Citizens · Employers · Partners
              </li>
            </ul>
          </section>
        </div>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <Logo />
          <p>© 2026 Hunar Vikas India — Maharashtra pilot</p>
          <p>
            <a href="mailto:hello@hunarvikas.in">hello@hunarvikas.in</a>
          </p>
        </div>
      </footer>
    </>
  )
}
