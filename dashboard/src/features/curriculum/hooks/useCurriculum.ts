import { useFilters } from '../../../context/FilterContext.tsx';
import { useAsync } from '../../../hooks/useAsync.ts';
import { getCurriculum } from '../api/curriculum.service.ts';

export function useCurriculum() {
  const { filters } = useFilters();
  const { data, loading, error, reload } = useAsync(
    () => getCurriculum(filters),
    [filters.state, filters.district, filters.sector, filters.dateRange],
  );
  return { rows: data ?? [], loading, error, reload };
}
