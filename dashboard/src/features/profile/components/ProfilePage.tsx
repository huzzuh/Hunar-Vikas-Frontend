import '@shared/ui.css';
import { useAuth } from '../../../context/AuthContext.tsx';
import { useReveal } from '../../../hooks/useReveal.ts';
import '../profile.css';
import AboutCard from './AboutCard.tsx';
import ProfileHeader from './ProfileHeader.tsx';
import ProfileTabs from './ProfileTabs.tsx';

export default function ProfilePage() {
  useReveal('profile');
  const { currentUser } = useAuth();

  return (
    <div className="profile-page">
      <ProfileHeader userId={currentUser.userId} />
      <AboutCard userId={currentUser.userId} />
      <ProfileTabs userId={currentUser.userId} />
    </div>
  );
}
