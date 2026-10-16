import { useMemo, useState } from 'react';
import { useFilters } from '../../../context/FilterContext.tsx';
import { useToastContext } from '../../../context/ToastContext.tsx';
import { useAsync } from '../../../hooks/useAsync.ts';
import { getCourses } from '../api/training.service.ts';
import type { Course } from '../types.ts';

export function useTraining() {
  const { filters, query } = useFilters();
  const { notify } = useToastContext();
  const { data, loading, error, reload } = useAsync(
    () => getCourses(filters),
    [filters.state, filters.district, filters.sector, filters.dateRange],
  );
  const [saved, setSaved] = useState<string[]>(['c2']);

  const courses: Course[] = useMemo(() => data ?? [], [data]);

  const visibleCourses: Course[] = useMemo(() => {
    const q = query.trim().toLowerCase();
    return courses.filter((c) => {
      if (q === '') return true;
      return `${c.title} ${c.tag} ${c.mode} ${c.place}`.toLowerCase().includes(q);
    });
  }, [courses, query]);

  const savedCourses: Course[] = useMemo(
    () => courses.filter((c) => saved.includes(c.id)),
    [courses, saved],
  );

  function toggleSave(id: string) {
    setSaved((prev) => {
      const has = prev.includes(id);
      notify(has ? 'Removed from Saved Items' : 'Saved to your items');
      return has ? prev.filter((s) => s !== id) : [...prev, id];
    });
  }

  return { courses, visibleCourses, savedCourses, saved, loading, error, reload, toggleSave };
}
