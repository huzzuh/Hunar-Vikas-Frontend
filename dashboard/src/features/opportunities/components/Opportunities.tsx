import { useToastContext } from '../../../context/ToastContext.tsx';
import { useOpportunities } from '../hooks/useOpportunities.ts';

export default function Opportunities() {
  const { items } = useOpportunities();
  const { notify } = useToastContext();

  return (
    <section id="opportunities" className="panel rail-card reveal" aria-label="Opportunities for you">
      <div className="panel-head tight">
        <span className="panel-title">
          <strong className="row-ico">
            <i className="fa-solid fa-briefcase green-ico" aria-hidden="true" /> Opportunities For You
          </strong>
        </span>
        <button
          type="button"
          className="link sm"
          onClick={() => notify('Demo only — full list coming soon')}
        >
          View All <i className="fa-solid fa-arrow-right" aria-hidden="true" />
        </button>
      </div>
      <ul className="opp-list">
        {items.map((o) => (
          <li key={o.id}>
            <button type="button" onClick={() => notify(`Demo only — “${o.title}”`)}>
              <span className={`opp-ico ${o.tint}`}>
                <i className={o.icon} aria-hidden="true" />
              </span>
              <span>
                <strong>{o.title}</strong>
                <small>{o.desc}</small>
              </span>
              <i className="fa-solid fa-chevron-right chev" aria-hidden="true" />
            </button>
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="btn btn-mint btn-full"
        onClick={() => notify('Demo only — explore coming soon')}
      >
        Explore Opportunities <i className="fa-solid fa-arrow-right" aria-hidden="true" />
      </button>
    </section>
  );
}
