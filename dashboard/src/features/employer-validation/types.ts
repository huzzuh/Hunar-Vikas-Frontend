export type ValidationStatus = 'proposed' | 'in-review' | 'validated' | 'rejected';

export type ValidationRow = {
  id: string;
  change: string;
  course: string;
  employer: string;
  status: ValidationStatus;
};
