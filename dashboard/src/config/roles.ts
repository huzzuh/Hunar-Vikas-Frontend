export type UserRole = 'citizen' | 'artisan' | 'employer' | 'training-partner' | 'admin';

export type RoleMeta = {
  id: UserRole;
  label: string;
  description: string;
};

export const ROLES: RoleMeta[] = [
  { id: 'citizen', label: 'Citizen', description: 'Job seeker / learner exploring skills and work.' },
  { id: 'artisan', label: 'Artisan', description: 'Self-employed craftsperson growing a home business.' },
  { id: 'employer', label: 'Employer', description: 'Hiring and validating skills demand.' },
  { id: 'training-partner', label: 'Training Partner', description: 'Runs courses and tracks placement health.' },
  { id: 'admin', label: 'Admin', description: 'Plans capacity across states and districts.' },
];

export const DEFAULT_ROLE: UserRole = 'artisan';
