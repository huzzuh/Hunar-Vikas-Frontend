import { useFilters } from '../../../context/FilterContext.tsx';
import { useAsync } from '../../../hooks/useAsync.ts';
import { getSkillGaps } from '../api/skill-gap.service.ts';

export function useSkillGap() {
  const { filters } = useFilters();
  const { data, loading, error, reload } = useAsync(
    () => getSkillGaps(filters),
    [filters.state, filters.district, filters.sector, filters.dateRange],
  );
  return { rows: data ?? [], loading, error, reload };
}
