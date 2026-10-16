import type { GlobalFilters } from '../types/index.ts';

export function toQueryString(filters: GlobalFilters): string {
  const params = new URLSearchParams({
    state: filters.state,
    district: filters.district,
    sector: filters.sector,
    dateRange: filters.dateRange,
  });
  return params.toString();
}
