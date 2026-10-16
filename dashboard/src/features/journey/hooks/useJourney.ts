import { useFilters } from '../../../context/FilterContext.tsx';
import { useAsync } from '../../../hooks/useAsync.ts';
import { getJourney } from '../api/journey.service.ts';

export function useJourney() {
  const { filters } = useFilters();
  const { data, loading, error, reload } = useAsync(
    () => getJourney(filters),
    [filters.state, filters.district, filters.sector, filters.dateRange],
  );
  return { milestones: data ?? [], loading, error, reload };
}
