import { useMemo, useState } from 'react';
import { useFilters } from '../../../context/FilterContext.tsx';
import { useToastContext } from '../../../context/ToastContext.tsx';
import { useAsync } from '../../../hooks/useAsync.ts';
import { SECTOR_SCALE } from '../api/demand.mock.ts';
import { getDemandIntel } from '../api/demand.service.ts';

export function useDemand() {
  const { filters, demandBoost, refreshIntel } = useFilters();
  const { notify } = useToastContext();
  const [sector, setSector] = useState<string>('All sectors');
  const { data, loading, error, reload } = useAsync(
    () => getDemandIntel(filters),
    [filters.state, filters.district, filters.sector, filters.dateRange],
  );

  const scale = SECTOR_SCALE[sector] ?? 1;
  const base = data?.base ?? [];
  const trajectory = useMemo(
    () => base.map((v) => Math.min(20, v * scale + demandBoost * scale)),
    [base, scale, demandBoost],
  );
  const trajMax = trajectory.length > 0 ? (trajectory[trajectory.length - 1] ?? 0) : 0;

  function refresh() {
    refreshIntel();
    notify('Intelligence refreshed (demo figures)');
  }

  return {
    months: data?.months ?? [],
    trajectory,
    trajMax,
    mix: data?.mix ?? [],
    velocity: data?.velocity ?? [],
    sector,
    setSector,
    loading,
    error,
    reload,
    refresh,
  };
}
