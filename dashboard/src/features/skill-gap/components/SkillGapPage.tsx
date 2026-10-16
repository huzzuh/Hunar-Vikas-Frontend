import { useReveal } from '../../../hooks/useReveal.ts';
import '../skill-gap.css';
import { useSkillGap } from '../hooks/useSkillGap.ts';

export default function SkillGapPage() {
  useReveal('skill-gap');
  const { rows, loading, error } = useSkillGap();

  return (
    <section className="panel reveal scaffold" aria-label="Skill gap">
      <div className="panel-head">
        <span className="panel-ico">
          <i className="fa-solid fa-chart-column" aria-hidden="true" />
        </span>
        <span className="panel-title">
          <strong>Skill Gap</strong>
          <small>Demand vs supply per job role, by state, district and sector.</small>
        </span>
      </div>
      {loading && <p className="empty">Loading skill gaps…</p>}
      {error !== null && <p className="empty">{error}</p>}
      {!loading && error === null && (
        <div className="scaffold-table-wrap">
          <table className="scaffold-table">
            <thead>
              <tr>
                <th>Role</th>
                <th>District</th>
                <th>Sector</th>
                <th>Demand</th>
                <th>Supply</th>
                <th>Gap</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id}>
                  <td>{r.role}</td>
                  <td>{r.district}</td>
                  <td>{r.sector}</td>
                  <td>{r.demand.toLocaleString('en-IN')}</td>
                  <td>{r.supply.toLocaleString('en-IN')}</td>
                  <td>
                    <strong>{r.gap.toLocaleString('en-IN')}</strong>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
