import { useFilters } from '../../../context/FilterContext.tsx';
import { useAsync } from '../../../hooks/useAsync.ts';
import { getValidations } from '../api/employer-validation.service.ts';

export function useEmployerValidation() {
  const { filters } = useFilters();
  const { data, loading, error, reload } = useAsync(
    () => getValidations(filters),
    [filters.state, filters.district, filters.sector, filters.dateRange],
  );
  return { rows: data ?? [], loading, error, reload };
}
