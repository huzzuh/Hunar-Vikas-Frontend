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

function LoginVisual() {
  return (
    <aside className="brand-visual hero-fade" aria-label="Building a skilled Maharashtra">
      <img
        className="brand-visual-img"
        src={`${import.meta.env.BASE_URL}login-hero.png`}
        alt="Building a skilled Maharashtra — Your skills matter, your journey starts here. Learn new skills, find opportunities, get recognised, build a brighter future. A stronger Maharashtra with skilled communities."
      />
    </aside>
  )
}

export default function App() {
  const [view, setView] = useState<'login' | 'forgot'>('login')
  const [role, setRole] = useState<Role>('Citizen')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [remember, setRemember] = useState(true)
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')
  const [forgotEmail, setForgotEmail] = useState('')
  const [forgotError, setForgotError] = useState<string | undefined>(undefined)
  const [forgotStatus, setForgotStatus] = useState<'idle' | 'loading' | 'sent'>('idle')

  function validate(): boolean {
    const next: typeof errors = {}
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      next.email = 'Enter a valid email address.'
    }
    if (password.length < 6) {
      next.password = 'Password must be at least 6 characters.'
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

  function openForgot() {
    setForgotEmail(email.trim())
    setForgotError(undefined)
    setForgotStatus('idle')
    setView('forgot')
  }

  function closeForgot() {
    setView('login')
    setForgotError(undefined)
    setForgotStatus('idle')
  }

  function onForgotSubmit(e: FormEvent) {
    e.preventDefault()
    if (forgotStatus === 'loading') return
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(forgotEmail.trim())) {
      setForgotError('Enter a valid email address.')
      return
    }
    setForgotError(undefined)
    setForgotStatus('loading')
    window.setTimeout(() => setForgotStatus('sent'), 900)
  }

  return (
    <>
      <header className="header">
        <div className="container header-inner">
          <Logo />
          <div className="header-actions">
            <span className="header-note hide-sm">
              <i className="fa-solid fa-shield-halved" aria-hidden="true" /> Secure sign-in
            </span>
            <a href="/" className="btn btn-outline">
              Back to Home
            </a>
          </div>
        </div>
      </header>

      <main className="container login-wrap">
        <div className="login-grid">
          <LoginVisual />

          <section
            className="login-card hero-fade"
            style={{ animationDelay: '150ms' }}
            aria-label={view === 'forgot' ? 'Reset password' : 'Sign in'}
          >
            {view === 'forgot' ? (
              <>
                <div className="login-head">
                  <button type="button" className="back-link" onClick={closeForgot}>
                    <i className="fa-solid fa-arrow-left" aria-hidden="true" /> Back to sign in
                  </button>
                  <h2>Reset your password</h2>
                  <p>Enter the email you signed up with and we’ll send you a secure reset link.</p>
                </div>

                {forgotStatus === 'sent' ? (
                  <div className="success" role="status">
                    <span className="success-ico">
                      <i className="fa-solid fa-circle-check" aria-hidden="true" />
                    </span>
                    <div>
                      <strong>Reset link sent</strong>
                      <p>
                        If an account exists for <span className="muted">{forgotEmail.trim()}</span>, you’ll
                        receive a password-reset link shortly. Check your inbox and spam folder.
                      </p>
                      <div className="success-actions">
                        <button type="button" className="btn btn-primary" onClick={closeForgot}>
                          Back to sign in
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline"
                          onClick={() => setForgotStatus('idle')}
                        >
                          Use a different email
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={onForgotSubmit} noValidate>
                    <div className="field">
                      <label htmlFor="forgot-email">Email address</label>
                      <div className={`control ${forgotError ? 'invalid' : ''}`}>
                        <i className="fa-regular fa-envelope" aria-hidden="true" />
                        <input
                          id="forgot-email"
                          type="email"
                          autoComplete="email"
                          placeholder="you@example.in"
                          value={forgotEmail}
                          onChange={(e) => setForgotEmail(e.target.value)}
                          aria-invalid={Boolean(forgotError)}
                          aria-describedby={forgotError ? 'forgot-email-err' : undefined}
                          autoFocus
                        />
                      </div>
                      {forgotError && (
                        <small id="forgot-email-err" className="err" role="alert">
                          {forgotError}
                        </small>
                      )}
                    </div>

                    <p className="forgot-note">
                      <i className="fa-solid fa-shield-halved" aria-hidden="true" /> The link expires in 30
                      minutes and can be used only once.
                    </p>

                    <button
                      type="submit"
                      className="btn btn-primary btn-lg btn-full"
                      disabled={forgotStatus === 'loading'}
                    >
                      {forgotStatus === 'loading' ? (
                        <>
                          <span className="spinner" aria-hidden="true" /> Sending link…
                        </>
                      ) : (
                        <>
                          <i className="fa-regular fa-paper-plane" aria-hidden="true" /> Send reset link
                        </>
                      )}
                    </button>
                  </form>
                )}

                <p className="signup">
                  Remembered your password?{' '}
                  <button type="button" className="link-btn" onClick={closeForgot}>
                    Sign in →
                  </button>
                </p>
              </>
            ) : (
              <>
                <div className="login-head">
                  <h2>Welcome back</h2>
                  <p>Sign in to continue to your Hunar Vikas workspace.</p>
                </div>

                <div className="role-group" role="radiogroup" aria-label="I am signing in as">
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

                {status === 'success' ? (
                  <div className="success" role="status">
                    <span className="success-ico">
                      <i className="fa-solid fa-circle-check" aria-hidden="true" />
                    </span>
                    <div>
                      <strong>Signed in as {role}</strong>
                      <p>
                        Demo only — this standalone login is not connected to a backend. <br />
                        <span className="muted">{email.trim()} · Maharashtra</span>
                      </p>
                      <button
                        type="button"
                        className="btn btn-outline"
                        onClick={() => {
                          setStatus('idle')
                          setPassword('')
                        }}
                      >
                        Sign in with a different account
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={onSubmit} noValidate>
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
                      <div className="label-row">
                        <label htmlFor="password">Password</label>
                        <button type="button" className="forgot forgot-btn" onClick={openForgot}>
                          Forgot password?
                        </button>
                      </div>
                      <div className={`control ${errors.password ? 'invalid' : ''}`}>
                        <i className="fa-solid fa-lock" aria-hidden="true" />
                        <input
                          id="password"
                          type={showPw ? 'text' : 'password'}
                          autoComplete="current-password"
                          placeholder="••••••••"
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

                    <label className="remember">
                      <input
                        type="checkbox"
                        checked={remember}
                        onChange={(e) => setRemember(e.target.checked)}
                      />
                      <span className="checkmark" aria-hidden="true">
                        {remember && <i className="fa-solid fa-check" />}
                      </span>
                      Keep me signed in on this device
                    </label>

                    <button
                      type="submit"
                      className="btn btn-primary btn-lg btn-full"
                      disabled={status === 'loading'}
                    >
                      {status === 'loading' ? (
                        <>
                          <span className="spinner" aria-hidden="true" /> Signing in…
                        </>
                      ) : (
                        <>Sign In →</>
                      )}
                    </button>

                    <div className="divider" aria-hidden="true">
                      <span>or</span>
                    </div>

                    <button type="button" className="btn btn-outline btn-lg btn-full">
                      <i className="fa-solid fa-mobile-screen" aria-hidden="true" /> Continue with Mobile OTP
                    </button>
                  </form>
                )}

                <p className="signup">
                  New to Hunar Vikas India? <a href="/registration/">Create an account →</a>
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
