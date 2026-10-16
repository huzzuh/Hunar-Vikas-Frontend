import { mockDelay } from '../../../utils/mock.ts';
import type { GlobalFilters } from '../../../types/index.ts';
import type { DemandIntelData } from '../types.ts';

/* Demand intelligence — demo-only indexed example figures for India,
   not live labour-market data. */
export const TRAJECTORY_MONTHS = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];

export const TRAJECTORY_BASE = [12.2, 13.4, 14.6, 15.8, 17.1, 18.3];

export const DEMAND_MIX = [
  { label: 'Digital & IT', pct: 31, color: '#E05A33' },
  { label: 'Manufacturing', pct: 24, color: '#0E6B4F' },
  { label: 'Healthcare', pct: 18, color: '#D99A0B' },
  { label: 'Green economy', pct: 15, color: '#0B3D2E' },
  { label: 'Commerce', pct: 12, color: '#B5446E' },
];

export const SECTOR_FILTERS = ['All sectors', ...DEMAND_MIX.map((d) => d.label)];

export const SECTOR_SCALE: Record<string, number> = {
  'All sectors': 1,
  'Digital & IT': 1.18,
  Manufacturing: 0.92,
  Healthcare: 0.68,
  'Green economy': 0.58,
  Commerce: 0.46,
};

export const VELOCITY = [
  { sector: 'Digital', title: 'Data Engineering', growth: '+28.4%', desc: 'Cloud data pipelines and analytics roles pulling strongly.' },
  { sector: 'Manufacturing', title: 'Industrial Automation', growth: '+24.8%', desc: 'PLCs, robotics maintenance and shop-floor digitisation.' },
  { sector: 'Green economy', title: 'Solar PV Installation', growth: '+31.2%', desc: 'Rooftop and solar-pump installations.' },
];

export async function fetchDemandIntel(filters: GlobalFilters): Promise<DemandIntelData> {
  void filters;
  await mockDelay(200);
  return {
    months: [...TRAJECTORY_MONTHS],
    base: [...TRAJECTORY_BASE],
    mix: DEMAND_MIX.map((d) => ({ ...d })),
    velocity: VELOCITY.map((v) => ({ ...v })),
  };
}
