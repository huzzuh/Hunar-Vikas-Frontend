import { useReveal } from '../../../hooks/useReveal.ts';
import '../employer-validation.css';
import { useEmployerValidation } from '../hooks/useEmployerValidation.ts';

export default function EmployerValidationPage() {
  useReveal('employer-validation');
  const { rows, loading, error } = useEmployerValidation();

  return (
    <section className="panel reveal scaffold" aria-label="Employer validation">
      <div className="panel-head">
        <span className="panel-ico">
          <i className="fa-solid fa-handshake" aria-hidden="true" />
        </span>
        <span className="panel-title">
          <strong>Employer Validation</strong>
          <small>Proposed curriculum changes and their review status.</small>
        </span>
      </div>
      {loading && <p className="empty">Loading validations…</p>}
      {error !== null && <p className="empty">{error}</p>}
      {!loading && error === null && (
        <div className="scaffold-table-wrap">
          <table className="scaffold-table">
            <thead>
              <tr>
                <th>Proposed change</th>
                <th>Employer</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id}>
                  <td>
                    <strong>{r.change}</strong>
                    <br />
                    <small>{r.course}</small>
                  </td>
                  <td>{r.employer}</td>
                  <td>
                    <span className={`tag ${r.status === 'validated' ? 'ok' : r.status === 'rejected' ? 'warn' : ''}`}>
                      {r.status}
                    </span>
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
