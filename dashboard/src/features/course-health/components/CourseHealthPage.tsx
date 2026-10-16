import { useReveal } from '../../../hooks/useReveal.ts';
import '../course-health.css';
import { useCourseHealth } from '../hooks/useCourseHealth.ts';

export default function CourseHealthPage() {
  useReveal('course-health');
  const { rows, loading, error } = useCourseHealth();

  return (
    <section className="panel reveal scaffold" aria-label="Course health">
      <div className="panel-head">
        <span className="panel-ico">
          <i className="fa-solid fa-heart-pulse" aria-hidden="true" />
        </span>
        <span className="panel-title">
          <strong>Course Health</strong>
          <small>Per-course trend, placement rate and status: growing, stable or declining.</small>
        </span>
      </div>
      {loading && <p className="empty">Loading course health…</p>}
      {error !== null && <p className="empty">{error}</p>}
      {!loading && error === null && (
        <div className="scaffold-cards">
          {rows.map((r) => (
            <article key={r.id} className="scaffold-card">
              <strong>{r.course}</strong>
              <small>
                {r.trend} · {r.placementRate}% placed
              </small>
              <span className={`tag ${r.status === 'growing' ? 'ok' : r.status === 'stable' ? '' : 'warn'}`}>
                {r.status}
              </span>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
