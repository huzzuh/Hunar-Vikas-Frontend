import { useToastContext } from '../../../context/ToastContext.tsx';
import { useLearning } from '../hooks/useLearning.ts';

export default function LearningGoals() {
  const { goals, bumpGoal } = useLearning();
  const { notify } = useToastContext();

  return (
    <section id="learning" className="panel rail-card reveal" aria-label="Your learning goals">
      <div className="panel-head tight">
        <span className="panel-title">
          <strong className="row-ico">
            <i className="fa-solid fa-graduation-cap green-ico" aria-hidden="true" /> Your Learning Goals
          </strong>
          <small>Skills you want to learn.</small>
        </span>
        <button
          type="button"
          className="link sm"
          onClick={() => notify('Demo only — goal manager coming soon')}
        >
          Manage Goals <i className="fa-solid fa-arrow-right" aria-hidden="true" />
        </button>
      </div>
      <ul className="goal-list">
        {goals.map((g) => (
          <li key={g.id}>
            <button
              type="button"
              className="goal-btn"
              onClick={() => bumpGoal(g.id)}
              title="Tap to log 25% progress (demo)"
            >
              <span className={`opp-ico ${g.pct > 0 ? 'tint-leaf' : 'tint-grey'}`}>
                <i className={g.icon} aria-hidden="true" />
              </span>
              <span className="goal-text">
                <strong>
                  {g.title} <em>{g.pct}%</em>
                </strong>
                <small>{g.desc}</small>
                <span className="bar">
                  <span style={{ width: `${g.pct}%` }} />
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
