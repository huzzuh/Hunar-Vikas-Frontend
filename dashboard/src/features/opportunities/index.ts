import type { Opportunity } from './types.ts';
import { getOpportunities } from './api/opportunities.service.ts';
import Opportunities from './components/Opportunities.tsx';
import OpportunitiesPage from './components/OpportunitiesPage.tsx';
import { useOpportunities } from './hooks/useOpportunities.ts';

export { getOpportunities, Opportunities, OpportunitiesPage, useOpportunities };
export type { Opportunity };
