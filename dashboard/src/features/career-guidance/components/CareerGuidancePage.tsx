import { useReveal } from '../../../hooks/useReveal.ts';
import '../career-guidance.css';
import { useCareerGuidance } from '../hooks/useCareerGuidance.ts';

export default function CareerGuidancePage() {
  useReveal('career-guidance');
  const { rows, loading, error } = useCareerGuidance();

  return (
    <section className="panel reveal scaffold" aria-label="Career guidance">
      <div className="panel-head">
        <span className="panel-ico">
          <i className="fa-solid fa-compass" aria-hidden="true" />
        </span>
        <span className="panel-title">
          <strong>Career Guidance</strong>
          <small>Your skill → target role → gap → recommended course → opportunity.</small>
        </span>
      </div>
      {loading && <p className="empty">Loading guidance…</p>}
      {error !== null && <p className="empty">{error}</p>}
      {!loading && error === null && (
        <ol className="guide-list">
          {rows.map((r) => (
            <li key={r.id} className="guide-step">
              <strong>
                {r.currentSkill} → {r.targetRole}
              </strong>
              <small>Gap: {r.gap}</small>
              <small>
                <i className="fa-solid fa-graduation-cap" aria-hidden="true" /> {r.recommendedCourse} ·{' '}
                <i className="fa-solid fa-briefcase" aria-hidden="true" /> {r.opportunity}
              </small>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
