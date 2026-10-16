import { useState } from 'react';
import { useFilters } from '../../../context/FilterContext.tsx';
import { useAsync } from '../../../hooks/useAsync.ts';
import { getProfileMeta } from '../api/profile.service.ts';

const FALLBACK_OPTIONS = [
  'Advanced Glazing',
  'Product Photography',
  'Digital Selling',
  'Warli Painting',
  'Tailoring',
  'Solar Installation',
  'Food Processing',
  'Beauty & Wellness',
];

export function useProfile() {
  const { filters } = useFilters();
  const { data } = useAsync(
    () => getProfileMeta(filters),
    [filters.state, filters.district, filters.sector, filters.dateRange],
  );
  const [interests, setInterests] = useState<string[]>([]);
  const [aspiration, setAspiration] = useState<string>('');
  const [prefMode, setPrefMode] = useState<string>('');

  const baseOptions = data?.interestOptions ?? FALLBACK_OPTIONS;
  const chips = Array.from(new Set([...baseOptions, ...interests]));
  const aspirations = data?.aspirations ?? ['Grow my home business', 'Find a job', 'Get certified', 'Learn new skills'];
  const modes = data?.modes ?? ['Online', 'In-person', 'Hybrid'];

  function toggleInterest(topic: string) {
    setInterests((prev) => (prev.includes(topic) ? prev.filter((x) => x !== topic) : [...prev, topic]));
  }

  return {
    interests,
    aspiration,
    prefMode,
    chips,
    aspirations,
    modes,
    toggleInterest,
    setAspiration,
    setPrefMode,
  };
}
