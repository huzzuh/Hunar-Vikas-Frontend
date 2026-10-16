import { useToastContext } from '../../../context/ToastContext.tsx';
import { useJourney } from '../hooks/useJourney.ts';

export default function GrowthJourney() {
  const { milestones } = useJourney();
  const { notify } = useToastContext();

  return (
    <section id="journey" className="panel rail-card reveal" aria-label="Your growth journey">
      <div className="panel-head tight">
        <span className="panel-title">
          <strong className="row-ico">
            <i className="fa-solid fa-circle-plus green-ico" aria-hidden="true" /> Your Growth Journey
          </strong>
          <small>Milestones so far.</small>
        </span>
        <button
          type="button"
          className="link sm"
          onClick={() => notify('Demo only — journey editor coming soon')}
        >
          Update Journey <i className="fa-solid fa-arrow-right" aria-hidden="true" />
        </button>
      </div>
      <ol className="timeline">
        {milestones.map((j) => (
          <li key={j.year} className={j.done ? 'done' : 'next'}>
            <span className="t-dot" aria-hidden="true">
              {j.done ? <i className="fa-solid fa-check" /> : <i className="fa-regular fa-circle" />}
            </span>
            <span>
              <small>{j.year}</small>
              <strong>{j.title}</strong>
              <p>{j.desc}</p>
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
