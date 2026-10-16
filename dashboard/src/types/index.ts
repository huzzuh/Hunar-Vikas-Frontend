export type GlobalFilters = {
  state: string;
  district: string;
  sector: string;
  dateRange: string;
};

export const DEFAULT_FILTERS: GlobalFilters = {
  state: 'Maharashtra',
  district: 'All districts',
  sector: 'All sectors',
  dateRange: 'Last 6 months',
};

export const FILTER_STATES = ['Maharashtra', 'All India'];

export const FILTER_DISTRICTS = ['All districts', 'Pune', 'Nashik', 'Nagpur'];

export const FILTER_SECTORS = [
  'All sectors',
  'Digital & IT',
  'Manufacturing',
  'Healthcare',
  'Green economy',
  'Commerce',
];

export const FILTER_RANGES = ['Last 6 months', 'Last 12 months', 'Year to date'];
