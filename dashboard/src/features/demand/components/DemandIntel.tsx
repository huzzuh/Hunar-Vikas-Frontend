import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFilters } from '../../../context/FilterContext.tsx';
import { useToastContext } from '../../../context/ToastContext.tsx';
import { SECTOR_FILTERS } from '../api/demand.mock.ts';
import { useDemand } from '../hooks/useDemand.ts';

export default function DemandIntel() {
  const { query } = useFilters();
  const { notify } = useToastContext();
  const navigate = useNavigate();
  const { months, trajectory, trajMax, mix, velocity, sector, setSector, refresh } = useDemand();

  const DONUT_R = 60;
  const DONUT_C = 2 * Math.PI * DONUT_R;
  const donutSegs = useMemo(() => {
    let acc = 0;
    return mix.map((d) => {
      const frac = d.pct / 100;
      const len = Math.max(frac * DONUT_C - 3, 2);
      const seg = { ...d, dash: len, offset: acc };
      acc += frac * DONUT_C;
      return seg;
    });
  }, [mix, DONUT_C]);

  const W = 560;
  const H = 230;
  const PAD_L = 36;
  const PAD_B = 26;
  const PAD_T = 10;
  const trajPts = trajectory.map((v, i) => {
    const x = PAD_L + (i * (W - PAD_L - 8)) / Math.max(months.length - 1, 1);
    const y = PAD_T + (1 - v / 20) * (H - PAD_T - PAD_B);
    return { x, y, v };
  });
  const trajLine = trajPts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
  const trajArea =
    trajPts.length > 0
      ? `${trajLine} L${trajPts[trajPts.length - 1]?.x.toFixed(1)},${(H - PAD_B).toFixed(1)} L${trajPts[0]?.x.toFixed(1)},${(H - PAD_B).toFixed(1)} Z`
      : '';

  const q = query.trim().toLowerCase();

  return (
    <section id="demand" className="panel intel reveal" aria-label="Demand intelligence">
      <div className="intel-head">
        <div>
          <p className="mono-eyebrow">04 / DEMAND INTELLIGENCE</p>
          <h2>Follow the pull.</h2>
          <p className="intel-sub">Where employers are creating pressure. Demo figures for India.</p>
        </div>
      </div>

      <div className="sector-row" role="group" aria-label="Filter intelligence by sector">
        {SECTOR_FILTERS.map((s) => (
          <button
            key={s}
            type="button"
            className={`sector-chip ${sector === s ? 'on' : ''}`}
            onClick={() => setSector(s)}
            aria-pressed={sector === s}
          >
            {s}
          </button>
        ))}
        <button type="button" className="link sm sector-refresh" onClick={refresh}>
          <i className="fa-solid fa-rotate" aria-hidden="true" /> Refresh
        </button>
      </div>

      <div className="intel-grid">
        <article className="intel-card" aria-label="Openings trajectory">
          <strong>Openings trajectory</strong>
          <small>
            Six-month indexed view · {sector} · now {trajMax.toFixed(1)}L
          </small>
          <svg
            className="traj"
            viewBox={`0 0 ${W} ${H}`}
            role="img"
            aria-label={`Openings rising to ${trajMax.toFixed(1)} lakh openings`}
          >
            <defs>
              <linearGradient id="trajFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0E6B4F" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#0E6B4F" stopOpacity="0.04" />
              </linearGradient>
            </defs>
            {[0, 5, 10, 15, 20].map((v) => {
              const y = PAD_T + (1 - v / 20) * (H - PAD_T - PAD_B);
              return (
                <g key={v}>
                  <line x1={PAD_L} y1={y} x2={W - 4} y2={y} stroke={v === 0 ? '#c9d6cc' : '#e7ede8'} strokeWidth="1" />
                  <text x={4} y={y + 4} fontSize="10" fill="#8a94a0">
                    {v === 0 ? '0' : `${v}L`}
                  </text>
                </g>
              );
            })}
            <path d={trajArea} fill="url(#trajFill)" />
            <path
              d={trajLine}
              fill="none"
              stroke="#0E6B4F"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="traj-line"
            />
            {trajPts.map((p, i) => (
              <g key={months[i]}>
                <circle cx={p.x} cy={p.y} r="4.5" fill="#fff" stroke="#0E6B4F" strokeWidth="2.5">
                  <title>
                    {months[i]}: {p.v.toFixed(1)}L openings (indexed demo)
                  </title>
                </circle>
                <text x={p.x} y={H - 8} fontSize="10" fill="#8a94a0" textAnchor="middle">
                  {months[i]}
                </text>
              </g>
            ))}
          </svg>
        </article>

        <article className="intel-card" aria-label="Demand mix">
          <strong>Demand mix</strong>
          <small>Share of active openings</small>
          <div className="mix-wrap">
            <span className="mix-donut">
              <svg viewBox="0 0 160 160" role="img" aria-label="Demand mix donut chart">
                {donutSegs.map((d) => (
                  <circle
                    key={d.label}
                    cx="80"
                    cy="80"
                    r={DONUT_R}
                    fill="none"
                    stroke={d.color}
                    strokeWidth="24"
                    strokeDasharray={`${d.dash.toFixed(1)} ${(DONUT_C - d.dash).toFixed(1)}`}
                    strokeDashoffset={(-d.offset).toFixed(1)}
                    transform="rotate(-90 80 80)"
                    opacity={sector === 'All sectors' || sector === d.label ? 1 : 0.22}
                  >
                    <title>
                      {d.label}: {d.pct}%
                    </title>
                  </circle>
                ))}
              </svg>
              <span className="mix-center" aria-hidden="true">
                <b>{trajMax.toFixed(1)}L</b>
                <small>active</small>
              </span>
            </span>
            <ul className="mix-legend">
              {donutSegs.map((d) => (
                <li key={d.label}>
                  <button
                    type="button"
                    className={sector === d.label ? 'picked' : ''}
                    onClick={() => setSector((s) => (s === d.label ? 'All sectors' : d.label))}
                    title={`Filter to ${d.label}`}
                  >
                    <span className="legend-dot" style={{ background: d.color }} aria-hidden="true" />
                    {d.label}
                    <span className="pct">{d.pct}%</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </article>
      </div>

      <article className="moving" aria-label="What is moving now">
        <div className="moving-head">
          <div>
            <strong>What is moving now</strong>
            <small>Highest velocity demand clusters in the current window</small>
          </div>
          <button type="button" className="link sm gaps-link" onClick={() => navigate('/skill-gap')}>
            See skill gaps <i className="fa-solid fa-chevron-right" aria-hidden="true" />
          </button>
        </div>
        <div className="moving-grid">
          {velocity
            .filter((v) => (q ? `${v.sector} ${v.title}`.toLowerCase().includes(q) : true))
            .map((v) => (
              <button
                key={v.title}
                type="button"
                className="velocity"
                onClick={() => notify(`Demo only — “${v.title}” skill gap`)}
              >
                <span className="vel-top">
                  <small>{v.sector.toUpperCase()}</small>
                  <i className="fa-solid fa-arrow-trend-up vel-arrow" aria-hidden="true" />
                </span>
                <strong>{v.title}</strong>
                <span className="vel-growth">
                  {v.growth} <em>growth</em>
                </span>
                <small className="vel-desc">{v.desc}</small>
              </button>
            ))}
        </div>
      </article>
    </section>
  );
}
