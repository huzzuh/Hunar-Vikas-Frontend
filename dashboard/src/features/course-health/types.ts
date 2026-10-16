export type CourseHealthStatus = 'growing' | 'stable' | 'declining';

export type CourseHealthRow = {
  id: string;
  course: string;
  trend: string;
  placementRate: number;
  status: CourseHealthStatus;
};
