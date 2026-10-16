import { useFilters } from '../../../context/FilterContext.tsx';
import { useAsync } from '../../../hooks/useAsync.ts';
import { getTrainingPlan } from '../api/training-plan.service.ts';

export function useTrainingPlan() {
  const { filters } = useFilters();
  const { data, loading, error, reload } = useAsync(
    () => getTrainingPlan(filters),
    [filters.state, filters.district, filters.sector, filters.dateRange],
  );
  return { rows: data ?? [], loading, error, reload };
}
