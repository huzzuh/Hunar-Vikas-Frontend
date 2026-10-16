import { useReveal } from '../../../hooks/useReveal.ts';
import '../training-plan.css';
import { useTrainingPlan } from '../hooks/useTrainingPlan.ts';

export default function TrainingPlanPage() {
  useReveal('training-plan');
  const { rows, loading, error } = useTrainingPlan();

  return (
    <section className="panel reveal scaffold" aria-label="Training plan">
      <div className="panel-head">
        <span className="panel-ico">
          <i className="fa-solid fa-clipboard-list" aria-hidden="true" />
        </span>
        <span className="panel-title">
          <strong>Training Plan</strong>
          <small>Per-state plan: priority trades, seats, trainers and equipment gaps.</small>
        </span>
      </div>
      {loading && <p className="empty">Loading training plan…</p>}
      {error !== null && <p className="empty">{error}</p>}
      {!loading && error === null && (
        <div className="scaffold-table-wrap">
          <table className="scaffold-table">
            <thead>
              <tr>
                <th>Priority trade</th>
                <th>Seats</th>
                <th>Trainers</th>
                <th>Equipment gap</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id}>
                  <td>
                    <strong>{r.priorityTrade}</strong>
                    <br />
                    <small>{r.state}</small>
                  </td>
                  <td>{r.seats.toLocaleString('en-IN')}</td>
                  <td>{r.trainers}</td>
                  <td>{r.equipmentGap}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
