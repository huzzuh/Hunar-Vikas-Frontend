import { useReveal } from '../../../hooks/useReveal.ts';
import { GrowthJourney } from '../../journey/index.ts';
import { LearningGoals } from '../../learning/index.ts';
import { Opportunities } from '../../opportunities/index.ts';
import { SkillPassport } from '../../passport/index.ts';
import { CourseList } from '../../training/index.ts';

export default function OverviewPage() {
  useReveal('overview');
  return (
    <>
      <div className="center">
        <SkillPassport />
        <CourseList />
      </div>
      <div className="rail">
        <Opportunities />
        <LearningGoals />
        <GrowthJourney />
      </div>
    </>
  );
}
