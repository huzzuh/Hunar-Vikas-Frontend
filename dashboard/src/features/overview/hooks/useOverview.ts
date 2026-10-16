import { useEffect, useMemo, useState } from 'react';
import { useFilters } from '../../../context/FilterContext.tsx';
import { useAsync } from '../../../hooks/useAsync.ts';
import { getOverviewChecks } from '../api/overview.service.ts';
import type { OverviewCheck } from '../types.ts';

export function useOverview() {
  const { filters } = useFilters();
  const { data, loading, error, reload } = useAsync(
    () => getOverviewChecks(filters),
    [filters.state, filters.district, filters.sector, filters.dateRange],
  );
  const [checks, setChecks] = useState<boolean[]>([true, true, false, false]);

  useEffect(() => {
    if (data !== null) setChecks(data.map((c) => c.done));
  }, [data]);

  const items: OverviewCheck[] = useMemo(() => {
    const labels = data?.map((c) => c.label) ?? [
      'Basic Information',
      'Skills & Experience',
      'Learning Interests',
      'Goals & Preferences',
    ];
    return labels.map((label, i) => ({ id: `check-${i}`, label, done: checks[i] ?? false }));
  }, [data, checks]);

  const completion = useMemo(
    () => (checks.length === 0 ? 0 : Math.round((checks.filter(Boolean).length / checks.length) * 100)),
    [checks],
  );

  function toggleCheck(index: number) {
    setChecks((prev) => prev.map((v, j) => (j === index ? !v : v)));
  }

  function completeSection(index: number) {
    setChecks((prev) => prev.map((v, j) => (j === index ? true : v)));
  }

  return { items, checks, completion, loading, error, reload, toggleCheck, completeSection };
}
