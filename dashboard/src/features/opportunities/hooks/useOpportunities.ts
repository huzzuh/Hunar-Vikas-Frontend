import { useMemo } from 'react';
import { useFilters } from '../../../context/FilterContext.tsx';
import { useAsync } from '../../../hooks/useAsync.ts';
import { getOpportunities } from '../api/opportunities.service.ts';

export function useOpportunities() {
  const { filters, query } = useFilters();
  const { data, loading, error, reload } = useAsync(
    () => getOpportunities(filters),
    [filters.state, filters.district, filters.sector, filters.dateRange],
  );

  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    const all = data ?? [];
    if (q === '') return all;
    return all.filter((o) => `${o.title} ${o.desc}`.toLowerCase().includes(q));
  }, [data, query]);

  return { items, loading, error, reload };
}
