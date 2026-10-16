import { useLocation } from 'react-router-dom';
import { NAV } from '../../config/navigation.ts';
import { useFilters } from '../../context/FilterContext.tsx';
import { FILTER_RANGES, FILTER_SECTORS, FILTER_STATES } from '../../types/index.ts';

/** Paths of the Growth nav group — the only place global filters appear. */
const GROWTH_PATHS: string[] = NAV.filter((n) => n.group === 'Growth' && n.path !== undefined).map(
  (n) => n.path as string,
);

export default function ContextBar() {
  const { filters, patchFilters } = useFilters();
  const { pathname } = useLocation();

  if (!GROWTH_PATHS.includes(pathname)) return null;

  return (
    <span className="ctx-filters" role="group" aria-label="Global filters">
      <label>
        State
        <select value={filters.state} onChange={(e) => patchFilters({ state: e.target.value })}>
          {FILTER_STATES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </label>
      <label>
        Sector
        <select value={filters.sector} onChange={(e) => patchFilters({ sector: e.target.value })}>
          {FILTER_SECTORS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </label>
      <label>
        Range
        <select value={filters.dateRange} onChange={(e) => patchFilters({ dateRange: e.target.value })}>
          {FILTER_RANGES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </label>
    </span>
  );
}
