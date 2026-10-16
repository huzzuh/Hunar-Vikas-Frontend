export type DemandSlice = {
  label: string;
  pct: number;
  color: string;
};

export type VelocityItem = {
  sector: string;
  title: string;
  growth: string;
  desc: string;
};

export type DemandIntelData = {
  months: string[];
  base: number[];
  mix: DemandSlice[];
  velocity: VelocityItem[];
};
