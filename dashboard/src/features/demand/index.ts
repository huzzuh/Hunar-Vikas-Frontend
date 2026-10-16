import type { DemandIntelData, DemandSlice, VelocityItem } from './types.ts';
import { getDemandIntel } from './api/demand.service.ts';
import DemandIntel from './components/DemandIntel.tsx';
import DemandPage from './components/DemandPage.tsx';
import { useDemand } from './hooks/useDemand.ts';

export { DemandIntel, DemandPage, getDemandIntel, useDemand };
export type { DemandIntelData, DemandSlice, VelocityItem };
