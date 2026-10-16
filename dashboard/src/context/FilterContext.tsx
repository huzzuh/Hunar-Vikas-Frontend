import { createContext, useCallback, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { DEFAULT_FILTERS } from '../types/index.ts';
import type { GlobalFilters } from '../types/index.ts';

type FilterValue = {
  query: string;
  setQuery: (query: string) => void;
  filters: GlobalFilters;
  patchFilters: (patch: Partial<GlobalFilters>) => void;
  resetFilters: () => void;
  demandBoost: number;
  refreshIntel: () => void;
};

const FilterContext = createContext<FilterValue | null>(null);

export function FilterProvider({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState<string>('');
  const [filters, setFilters] = useState<GlobalFilters>(DEFAULT_FILTERS);
  const [demandBoost, setDemandBoost] = useState<number>(0);

  const patchFilters = useCallback((patch: Partial<GlobalFilters>) => {
    setFilters((prev) => ({ ...prev, ...patch }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
  }, []);

  const refreshIntel = useCallback(() => {
    setDemandBoost((b) => b + 0.3);
  }, []);

  return (
    <FilterContext.Provider
      value={{ query, setQuery, filters, patchFilters, resetFilters, demandBoost, refreshIntel }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilters(): FilterValue {
  const value = useContext(FilterContext);
  if (value === null) throw new Error('useFilters must be used inside FilterProvider');
  return value;
}
