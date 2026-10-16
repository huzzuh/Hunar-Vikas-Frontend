import { useEffect, useState } from 'react'
import Logo from '@shared/Logo.tsx'
import './index.css'

const NAV = [
  { label: 'Explore Skills', items: ['Handicrafts', 'Construction', 'Green Jobs'] },
  { label: 'Training', items: ['Find Courses', 'Training Partners'] },
  { label: 'Opportunities', items: ['Jobs', 'Apprenticeships'] },
  { label: 'Insights', items: ['Skill Demand', 'District Data'] },
  { label: 'About', items: ['Mission', 'Partners'] },
]

const POPULAR = ['Tailoring', 'Solar Technician', 'Food Processing', 'Mobile Repair', 'Beauty & Wellness']

const SKILL_LINKS = [
  { icon: 'fa-solid fa-palette', label: 'Handicrafts & Artisan Skills', chip: 'chip-amber' },
  { icon: 'fa-solid fa-helmet-safety', label: 'Construction & Infrastructure', chip: 'chip-yellow' },
  { icon: 'fa-solid fa-seedling', label: 'Green Jobs & Sustainability', chip: 'chip-green' },
  { icon: 'fa-solid fa-hand-holding-heart', label: 'Care & Personal Services', chip: 'chip-blue' },
]

const TRUST = [
  { icon: 'fa-solid fa-users', title: 'Skill-first approach', sub: 'People, not just credentials' },
  { icon: 'fa-solid fa-leaf', title: 'Inclusive livelihoods', sub: 'Rural and urban communities' },
  { icon: 'fa-solid fa-map-location-dot', title: 'India pilot', sub: 'Built for local needs, scaled for India' },
  { icon: 'fa-solid fa-handshake', title: 'Multiple stakeholders', sub: 'Citizens, employers, training partners and more' },
  { icon: 'fa-solid fa-chart-line', title: 'Data-driven decisions', sub: 'For a stronger, more resilient workforce' },
]

function useTypewriter(total: number, typeDelay = 50) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setCount(total)
      return
    }
    if (count >= total) return
    const t = window.setTimeout(() => setCount((c) => Math.min(c + 1, total)), typeDelay)
    return () => window.clearTimeout(t)
  }, [count, total, typeDelay])
  return count
}

function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll('.reveal'))
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('visible'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          // Replay every time: show on enter, hide on exit
          e.target.classList.toggle('visible', e.isIntersecting)
        })
      },
      { threshold: 0.15 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

function Header() {
  const [open, setOpen] = useState(false)
  return (
    <header className="header">
      <div className="container header-inner">
        <Logo />
        <nav className={`nav ${open ? 'open' : ''}`} aria-label="Primary">
          {NAV.map((n) => (
            <a key={n.label} href="#" className="nav-link">
              {n.label} <span className="caret">▾</span>
            </a>
          ))}
          <div className="nav-mobile-cta">
            <a href="/login/" className="btn btn-outline">Sign In</a>
            <a href="/registration/" className="btn btn-primary">Get Started →</a>
          </div>
        </nav>
        <div className="header-actions">
          <a href="/login/" className="btn btn-outline hide-sm">Sign In</a>
          <a href="/registration/" className="btn btn-primary hide-sm">Get Started →</a>
          <button className="icon-btn menu-btn" aria-label="Menu" onClick={() => setOpen((v) => !v)}>
            {open ? '✕' : '☰'}
          </button>
        </div>
      </div>
    </header>
  )
}

function HeroArt() {
  return (
    <div className="hero-art" aria-hidden>
      <div className="hero-blob" />
      <div className="hero-map">
        <svg viewBox="0 0 220 250" role="img" aria-label="India map">
          <circle cx="98" cy="150" r="4" fill="#0E6B4F" opacity="0.9" />
          <circle cx="98" cy="150" r="8" fill="none" stroke="#0E6B4F" strokeWidth="1" opacity="0.35" />
        </svg>
      </div>

      <div className="people">
        <img
          className="people-photo"
          src="hero-people.jpg"
          alt="Skilled tradesperson, artisan, entrepreneur and learner of India with Gateway of India and Indian skylines"
        />
      </div>
    </div>
  )
}

function Hero() {
  const [q, setQ] = useState('')
  const LINE1 = 'Empowering Talent,'
  const LINE2 = 'Enabling Employment'
  const DOT = ''
  const TOTAL = LINE1.length + LINE2.length + DOT.length
  const count = useTypewriter(TOTAL, 50)
  const n1 = Math.min(count, LINE1.length)
  const n2 = Math.min(Math.max(count - LINE1.length, 0), LINE2.length)
  const n3 = Math.max(count - LINE1.length - LINE2.length, 0)
  return (
    <section className="hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">SKILLS FOR A BRIGHTER INDIA</p>
          <h1 className="typing-headline" aria-label="Empowering Talent, Enabling Employment">
            <span aria-hidden="true">
              {LINE1.slice(0, n1)
                .split('')
                .map((ch, i) => (
                  <span key={`l1-${i}`} className="type-char">
                    {ch === ' ' ? ' ' : ch}
                  </span>
                ))}
            </span>
            <br />
            <span aria-hidden="true">
              <span className="green">
                {LINE2.slice(0, n2)
                  .split('')
                  .map((ch, i) => (
                    <span key={`l2-${i}`} className="type-char">
                      {ch === ' ' ? ' ' : ch}
                    </span>
                  ))}
              </span>
              <span className="orange">
                {DOT.slice(0, n3)
                  .split('')
                  .map((ch, i) => (
                    <span key={`d-${i}`} className="type-char">
                      {ch}
                    </span>
                  ))}
              </span>
              <span className="type-caret" aria-hidden="true" />
            </span>
          </h1>
          <p className="lede hero-fade" style={{ animationDelay: '300ms' }}>
            Hunar Vikas India is a skill-first platform that connects citizens, artisans, skilled tradespeople,
            home-based entrepreneurs, employers, training institutions and workforce insights — for a more
            inclusive and prosperous India.
          </p>
          <div className="hero-cta hero-fade" style={{ animationDelay: '500ms' }}>
            <a href="#skills" className="btn btn-primary btn-lg">⌕ &nbsp; Explore Skills &nbsp; →</a>
            <a href="#training" className="btn btn-outline btn-lg"><i className="fa-solid fa-person-chalkboard" aria-hidden="true" /> &nbsp; Find Training</a>
          </div>

          <form
            className="searchbar"
            onSubmit={(e) => {
              e.preventDefault()
              const term = q.trim()
              window.location.href = term ? `/dashboard/?q=${encodeURIComponent(term)}` : '/dashboard/'
            }}
          >
            <div className="search-field">
              <span aria-hidden>⌕</span>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search skills,occupations, or training..."
                aria-label="Search skills"
              />
            </div>
            <div className="search-loc">
              <i className="fas fa-map-marker-alt loc-icon" aria-hidden="true" />
              <span className="loc-text">India</span>
            </div>
            <button className="btn btn-primary" type="submit">Search</button>
          </form>

          <div className="popular hero-fade" style={{ animationDelay: '650ms' }}>
            <span className="popular-label">Popular searches:</span>
            <div className="pills">
              {POPULAR.map((p, i) => (
                <button
                  type="button"
                  key={p}
                  className="pill"
                  style={{ animationDelay: `${750 + i * 70}ms` }}
                  onClick={() => setQ(p)}
                >
                  {p}
                </button>
              ))}
              <a href="#skills" className="more" style={{ animationDelay: `${750 + POPULAR.length * 70}ms` }}>
                More →
              </a>
            </div>
          </div>
        </div>
        <HeroArt />
      </div>
    </section>
  )
}

function FeatureCards() {
  return (
    <section className="container cards" id="skills">
      <article className="card mint reveal" style={{ '--reveal-delay': '0ms' } as any}>
        <div className="card-head">
          <i className="fa-solid fa-leaf"></i>
          <h3>Discover Skills</h3>
        </div>
        <p className="card-text">Explore 1,000+ skills and occupations across sectors, from traditional crafts to emerging green jobs.</p>
        <ul className="mini-list">
          {SKILL_LINKS.map((s) => (
            <li key={s.label}>
              <span className={`mini-ico ${s.chip}`}><i className={s.icon} aria-hidden="true" /></span>
              <span>{s.label}</span>
              <i className="fa-solid fa-chevron-right chev" aria-hidden="true" />
            </li>
          ))}
        </ul>
        <a href="#" className="link">Browse Skills <i className="fa-solid fa-arrow-right" aria-hidden="true" /></a>
      </article>

      <article className="card peach reveal" id="training" style={{ '--reveal-delay': '120ms' } as any}>
        <div className="card-head">
          <i className="fa-solid fa-briefcase"></i>
          <h3>Find Opportunities</h3>
        </div>
        <p className="card-text">Access jobs, apprenticeships, market linkages and government & private sector opportunities.</p>
        <div className="featured">
          <span className="feat-badge"><i className="fa-solid fa-star" aria-hidden="true" /> Featured</span>
          <strong>Solar Installation Technician</strong>
          <small className="feat-meta"><i className="fa-solid fa-location-dot" aria-hidden="true" /> Pune • Full-time</small>
          <div className="feat-pills">
            <span>Skilled Trades</span>
            <span>Green Jobs</span>
            <i className="fa-solid fa-chevron-right feat-go" aria-hidden="true" />
          </div>
        </div>
        <a href="#" className="link">View Opportunities <i className="fa-solid fa-arrow-right" aria-hidden="true" /></a>
      </article>

      <article className="card mint reveal" style={{ '--reveal-delay': '240ms' } as any}>
        <div className="card-head">
          <i className="fa-solid fa-chart-column"></i>
          <h3>Workforce Insights</h3>
        </div>
        <p className="card-text">Explore labour market trends, skill demand and district-level insights to make informed decisions.</p>
        <div className="chart">
          <small className="chart-title">Skill Demand (Demo)</small>
          <div className="bars">
            {[38, 46, 58, 70, 82, 96].map((h, i) => (
              <span key={i} style={{ height: `${h}%` }} />
            ))}
          </div>
          <div className="chart-x"><span>2024</span><span>2025</span><span>2026</span><span>2027</span></div>
          <p className="chart-note"><i className="fa-solid fa-arrow-trend-up" aria-hidden="true" /> Growing opportunities across India</p>
        </div>
        <a href="#" className="link">Explore Insights <i className="fa-solid fa-arrow-right" aria-hidden="true" /></a>
      </article>
    </section>
  )
}

function TrustBar() {
  return (
    <section className="container trust reveal">
      {TRUST.map((t, i) => (
        <div key={t.title} className="trust-item reveal" style={{ transitionDelay: `${i * 80}ms` }}>
          <span className="trust-ico"><i className={t.icon} aria-hidden="true" /></span>
          <div>
            <strong>{t.title}</strong>
            <small>{t.sub}</small>
          </div>
        </div>
      ))}
    </section>
  )
}

function Future() {
  return (
    <section className="container future">
      <div className="future-copy reveal">
        <p className="eyebrow">REAL SKILLS. BRIGHTER FUTURES.</p>
        <h2>
          From local skills to
          <br />
          <span className="green">limitless possibilities</span><span className="orange">.</span>
        </h2>
      </div>
      <p className="future-text reveal" style={{ transitionDelay: '100ms' }}>
        Whether you are a student, artisan, job seeker, employer or training provider, Hunar Vikas India helps
        you discover opportunities, build skills and be part of India's growing and diverse economy.
      </p>
      <div className="future-banner reveal" style={{ transitionDelay: '150ms' }}>
        <blockquote className="quote">
          <span className="qmark">❝</span>
          Skills create dignity, opportunities create stronger communities, and together they build a brighter
          India.
          <span className="qline" />
        </blockquote>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <Logo />
        <p>© 2026 Hunar Vikas India — System Online</p>
        <p>
          Hunar Vikas India<br />India pilot
        </p>
        <p>
          <a href="mailto:hello@hunarvikas.in">hello@hunarvikas.in</a>
          <br />
          <a href="#training">Find training near you</a>
        </p>
        <p>
          <a href="#skills">Explore skills</a>
          <br />
          <a href="#training">Opportunities</a>
          <br />
          <a href="#">Workforce insights</a>
        </p>
      </div>
    </footer>
  )
}

export default function App() {
  useReveal()
  return (
    <>
      <Header />
      <main>
        <Hero />
        <FeatureCards />
        <TrustBar />
        <Future />
      </main>
      <Footer />
    </>
  )
}
