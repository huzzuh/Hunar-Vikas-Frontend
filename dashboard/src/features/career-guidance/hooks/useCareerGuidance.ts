import { useFilters } from '../../../context/FilterContext.tsx';
import { useAsync } from '../../../hooks/useAsync.ts';
import { getGuidance } from '../api/career-guidance.service.ts';

export function useCareerGuidance() {
  const { filters } = useFilters();
  const { data, loading, error, reload } = useAsync(
    () => getGuidance(filters),
    [filters.state, filters.district, filters.sector, filters.dateRange],
  );
  return { rows: data ?? [], loading, error, reload };
}
