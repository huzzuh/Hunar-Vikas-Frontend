import { Navigate, Route, Routes } from 'react-router-dom';
import { CareerGuidancePage } from '../features/career-guidance/index.ts';
import { CourseHealthPage } from '../features/course-health/index.ts';
import { CurriculumPage } from '../features/curriculum/index.ts';
import { DemandPage } from '../features/demand/index.ts';
import { EmployerValidationPage } from '../features/employer-validation/index.ts';
import { JourneyPage } from '../features/journey/index.ts';
import { LearningPage } from '../features/learning/index.ts';
import { OpportunitiesPage } from '../features/opportunities/index.ts';
import { OverviewPage } from '../features/overview/index.ts';
import { PassportPage } from '../features/passport/index.ts';
import { ProfilePage } from '../features/profile/index.ts';
import { SkillGapPage } from '../features/skill-gap/index.ts';
import { CourseList } from '../features/training/index.ts';
import { TrainingPage } from '../features/training/index.ts';
import { TrainingPlanPage } from '../features/training-plan/index.ts';

/** Saved items stay a small placeholder over the training feature. Not expanded. */
function SavedPlaceholder() {
  return <CourseList savedOnly />;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<OverviewPage />} />
      <Route path="/passport" element={<PassportPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/training" element={<TrainingPage />} />
      <Route path="/opportunities" element={<OpportunitiesPage />} />
      <Route path="/learning" element={<LearningPage />} />
      <Route path="/journey" element={<JourneyPage />} />
      <Route path="/saved" element={<SavedPlaceholder />} />
      <Route path="/demand" element={<DemandPage />} />
      <Route path="/skill-gap" element={<SkillGapPage />} />
      <Route path="/curriculum" element={<CurriculumPage />} />
      <Route path="/course-health" element={<CourseHealthPage />} />
      <Route path="/employer-validation" element={<EmployerValidationPage />} />
      <Route path="/training-plan" element={<TrainingPlanPage />} />
      <Route path="/career-guidance" element={<CareerGuidancePage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
