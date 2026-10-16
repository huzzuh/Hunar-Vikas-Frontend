import { useReveal } from '../../../hooks/useReveal.ts';
import '../curriculum.css';
import { useCurriculum } from '../hooks/useCurriculum.ts';

export default function CurriculumPage() {
  useReveal('curriculum');
  const { rows, loading, error } = useCurriculum();

  return (
    <section className="panel reveal scaffold" aria-label="Curriculum alignment">
      <div className="panel-head">
        <span className="panel-ico">
          <i className="fa-solid fa-book-atlas" aria-hidden="true" />
        </span>
        <span className="panel-title">
          <strong>Curriculum Alignment</strong>
          <small>Course skills vs employer skills, alignment score and suggested updates.</small>
        </span>
      </div>
      {loading && <p className="empty">Loading curriculum…</p>}
      {error !== null && <p className="empty">{error}</p>}
      {!loading && error === null && (
        <div className="scaffold-table-wrap">
          <table className="scaffold-table">
            <thead>
              <tr>
                <th>Course</th>
                <th>Alignment</th>
                <th>Suggested update</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id}>
                  <td>
                    <strong>{r.course}</strong>
                    <br />
                    <small>
                      Teaches: {r.courseSkills} · Needs: {r.employerSkills}
                    </small>
                  </td>
                  <td>
                    <strong>{r.alignmentScore}%</strong>
                  </td>
                  <td>{r.suggestedUpdate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
