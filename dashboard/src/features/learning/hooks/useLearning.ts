import { useEffect, useState } from 'react';
import { useFilters } from '../../../context/FilterContext.tsx';
import { useAsync } from '../../../hooks/useAsync.ts';
import { getGoals } from '../api/learning.service.ts';
import type { Goal } from '../types.ts';

export function useLearning() {
  const { filters } = useFilters();
  const { data, loading, error, reload } = useAsync(
    () => getGoals(filters),
    [filters.state, filters.district, filters.sector, filters.dateRange],
  );
  const [goals, setGoals] = useState<Goal[]>([]);

  useEffect(() => {
    if (data !== null) setGoals(data);
  }, [data]);

  function bumpGoal(id: string) {
    setGoals((prev) => prev.map((g) => (g.id === id ? { ...g, pct: Math.min(100, g.pct + 25) } : g)));
  }

  return { goals, loading, error, reload, bumpGoal };
}
