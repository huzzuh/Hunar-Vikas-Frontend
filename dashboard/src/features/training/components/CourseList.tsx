import { useNavigate } from 'react-router-dom';
import { useFilters } from '../../../context/FilterContext.tsx';
import { useToastContext } from '../../../context/ToastContext.tsx';
import { useTraining } from '../hooks/useTraining.ts';

type CourseListProps = {
  savedOnly?: boolean;
};

export default function CourseList({ savedOnly = false }: CourseListProps) {
  const { query } = useFilters();
  const { notify } = useToastContext();
  const navigate = useNavigate();
  const { visibleCourses, savedCourses, saved, toggleSave } = useTraining();

  const list = savedOnly ? savedCourses : visibleCourses;

  function showAll() {
    navigate('/training');
  }

  function clearFilter() {
    navigate('/');
  }

  return (
    <section id="training" className="panel reveal" aria-label="Recommended training">
      <div className="panel-head">
        <span className="panel-ico">
          <i className="fa-solid fa-graduation-cap" aria-hidden="true" />
        </span>
        <span className="panel-title">
          <strong>Recommended for Your Growth</strong>
          <small>Example courses matched to you.</small>
        </span>
        {!savedOnly && (
          <button type="button" className="link" onClick={showAll}>
            View All Training <i className="fa-solid fa-arrow-right" aria-hidden="true" />
          </button>
        )}
      </div>
      {savedOnly && (
        <p className="filter-note">
          <i className="fa-regular fa-bookmark" aria-hidden="true" /> Showing saved items only ({saved.length}) ·{' '}
          <button type="button" className="link-btn" onClick={clearFilter}>
            clear
          </button>
        </p>
      )}
      <div className="course-grid">
        {list.length === 0 && (
          <p className="empty">No matches for “{query}”. Try “pottery”, “packaging” or “digital”.</p>
        )}
        {list.map((c) => (
          <article key={c.id} className="course">
            <div className={`course-thumb ${c.tint}`}>
              <i className={c.icon} aria-hidden="true" />
              <button
                type="button"
                className={`save ${saved.includes(c.id) ? 'on' : ''}`}
                onClick={() => toggleSave(c.id)}
                aria-label={saved.includes(c.id) ? `Unsave ${c.title}` : `Save ${c.title}`}
                aria-pressed={saved.includes(c.id)}
              >
                <i
                  className={`${saved.includes(c.id) ? 'fa-solid' : 'fa-regular'} fa-bookmark`}
                  aria-hidden="true"
                />
              </button>
            </div>
            <div className="course-body">
              <strong>{c.title}</strong>
              <div className="chips">
                <span className="chip">{c.tag}</span>
                <span className="chip ghost">
                  <i className={c.modeIcon} aria-hidden="true" /> {c.mode}
                </span>
              </div>
              <small className="meta">
                <i className="fa-solid fa-location-dot" aria-hidden="true" /> {c.place} &nbsp;·&nbsp;{' '}
                <i className="fa-solid fa-users" aria-hidden="true" /> {c.provider}
              </small>
              <p>{c.desc}</p>
              <button
                type="button"
                className="link"
                onClick={() => notify('Demo only — course details coming soon')}
              >
                View Details <i className="fa-solid fa-arrow-right" aria-hidden="true" />
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
