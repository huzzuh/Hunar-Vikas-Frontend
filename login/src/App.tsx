import { useState } from 'react'
import type { FormEvent } from 'react'
import Logo from '@shared/Logo.tsx'
import { copyText } from '@shared/clipboard.ts'
import { isEmail, isPassword } from '@shared/validators.ts'
import { sendResetLink, signIn } from './services/auth.service.ts'
import './index.css'



export default function App() {
  const [view, setView] = useState<'login' | 'forgot'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [remember, setRemember] = useState(true)
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')
  const [signInError, setSignInError] = useState<string | null>(null)
  const [signedInId, setSignedInId] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [forgotEmail, setForgotEmail] = useState('')
  const [forgotError, setForgotError] = useState<string | undefined>(undefined)
  const [forgotStatus, setForgotStatus] = useState<'idle' | 'loading' | 'sent'>('idle')

  function validate(): boolean {
    const next: typeof errors = {}
    if (!isEmail(email)) {
      next.email = 'Enter a valid email address.'
    }
    if (!isPassword(password)) {
      next.password = 'Password must be at least 6 characters.'
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function onSubmit(e: FormEvent): Promise<void> {
    e.preventDefault()
    if (status === 'loading') return
    if (!validate()) return
    setStatus('loading')
    setSignInError(null)
    try {
      const user = await signIn(email, password)
      setSignedInId(user.userId)
      setCopied(false)
      setStatus('success')
    } catch (err) {
      setSignInError(err instanceof Error ? err.message : 'Sign-in failed. Please try again.')
      setStatus('idle')
    }
  }

  async function copyId(): Promise<void> {
    if (!signedInId) return
    const ok = await copyText(signedInId)
    setCopied(ok)
    if (ok) window.setTimeout(() => setCopied(false), 2000)
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

  async function onForgotSubmit(e: FormEvent): Promise<void> {
    e.preventDefault()
    if (forgotStatus === 'loading') return
    if (!isEmail(forgotEmail)) {
      setForgotError('Enter a valid email address.')
      return
    }
    setForgotError(undefined)
    setForgotStatus('loading')
    try {
      await sendResetLink(forgotEmail)
      setForgotStatus('sent')
    } catch {
      setForgotStatus('idle')
    }
  }

  return (
    <>
      <header className="header">
        <div className="container header-inner">
          <Logo tagline="Building Skills. Empowering Futures" />
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

                {status === 'success' ? (
                  <div className="success" role="status">
                    <span className="success-ico">
                      <i className="fa-solid fa-circle-check" aria-hidden="true" />
                    </span>
                    <div>
                      <strong>Signed in successfully</strong>
                      <p>
                        Welcome back to your Hunar Vikas workspace. <br />
                        <span className="muted">{email.trim()} · India</span>
                      </p>
                      {signedInId && (
                        <p className="user-id-row">
                          <span className="muted">Your ID:</span>{' '}
                          <code className="user-id">{signedInId}</code>{' '}
                          <button type="button" className="btn btn-outline btn-sm" onClick={copyId}>
                            <i className="fa-regular fa-copy" aria-hidden="true" />{' '}
                            {copied ? 'Copied!' : 'Copy'}
                          </button>
                        </p>
                      )}
                      <div className="success-actions">
                        <a href="/dashboard/" className="btn btn-primary">
                          Open Dashboard →
                        </a>
                        <button
                          type="button"
                          className="btn btn-outline"
                          onClick={() => {
                            setStatus('idle')
                            setPassword('')
                            setSignedInId(null)
                          }}
                        >
                          Sign in with a different account
                        </button>
                      </div>
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

                    {signInError && (
                      <p className="err signin-err" role="alert">
                        {signInError}
                      </p>
                    )}

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
          <Logo tagline="Building Skills. Empowering Futures" />
          <p>© 2026 Hunar Vikas India — India pilot</p>
          <p>
            <a href="mailto:hello@hunarvikas.in">hello@hunarvikas.in</a>
          </p>
        </div>
      </footer>
    </>
  )
}
