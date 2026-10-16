import { useFilters } from '../../../context/FilterContext.tsx';
import { useAsync } from '../../../hooks/useAsync.ts';
import { getCourseHealth } from '../api/course-health.service.ts';

export function useCourseHealth() {
  const { filters } = useFilters();
  const { data, loading, error, reload } = useAsync(
    () => getCourseHealth(filters),
    [filters.state, filters.district, filters.sector, filters.dateRange],
  );
  return { rows: data ?? [], loading, error, reload };
}
