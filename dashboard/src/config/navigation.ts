export type NavId =
  | 'overview'
  | 'passport'
  | 'profile'
  | 'training'
  | 'opportunities'
  | 'learning'
  | 'journey'
  | 'saved'
  | 'demand'
  | 'skill-gap'
  | 'curriculum'
  | 'course-health'
  | 'employer-validation'
  | 'training-plan'
  | 'career-guidance'
  | 'settings';

export type NavGroup = 'My space' | 'Growth' | 'Signals' | 'Planning';

export type NavItem = {
  id: NavId;
  label: string;
  icon: string;
  /** Route path. Omitted for modal-only items like settings. */
  path?: string;
  group?: NavGroup;
};

export const NAV: NavItem[] = [
  { id: 'overview', label: 'Overview', icon: 'fa-solid fa-house', path: '/', group: 'My space' },
  { id: 'passport', label: 'My Skill Passport', icon: 'fa-solid fa-id-card', path: '/passport', group: 'My space' },
  { id: 'profile', label: 'My Profile', icon: 'fa-solid fa-user', path: '/profile', group: 'My space' },
  { id: 'learning', label: 'My Learning', icon: 'fa-solid fa-book-open', path: '/learning', group: 'My space' },
  { id: 'saved', label: 'Saved Items', icon: 'fa-regular fa-bookmark', path: '/saved', group: 'My space' },
  { id: 'training', label: 'Find Training', icon: 'fa-solid fa-graduation-cap', path: '/training', group: 'Growth' },
  { id: 'opportunities', label: 'Explore Opportunities', icon: 'fa-solid fa-briefcase', path: '/opportunities', group: 'Growth' },
  { id: 'journey', label: 'Career Journey', icon: 'fa-solid fa-route', path: '/journey', group: 'Growth' },
  {
    id: 'career-guidance',
    label: 'Career Guidance',
    icon: 'fa-solid fa-compass',
    path: '/career-guidance',
    group: 'Growth',
  },
  { id: 'demand', label: 'Demand Intelligence', icon: 'fa-solid fa-arrow-trend-up', path: '/demand', group: 'Signals' },
  { id: 'skill-gap', label: 'Skill Gap', icon: 'fa-solid fa-chart-column', path: '/skill-gap', group: 'Signals' },
  { id: 'curriculum', label: 'Curriculum', icon: 'fa-solid fa-book-atlas', path: '/curriculum', group: 'Signals' },
  {
    id: 'course-health',
    label: 'Course Health',
    icon: 'fa-solid fa-heart-pulse',
    path: '/course-health',
    group: 'Signals',
  },
  {
    id: 'employer-validation',
    label: 'Employer Validation',
    icon: 'fa-solid fa-handshake',
    path: '/employer-validation',
    group: 'Signals',
  },
  {
    id: 'training-plan',
    label: 'Training Plan',
    icon: 'fa-solid fa-clipboard-list',
    path: '/training-plan',
    group: 'Planning',
  },
  { id: 'settings', label: 'Settings', icon: 'fa-solid fa-gear' },
];

export const NAV_GROUPS: NavGroup[] = ['My space', 'Growth', 'Signals', 'Planning'];

export function pathFor(id: NavId): string {
  return NAV.find((n) => n.id === id)?.path ?? '/';
}
