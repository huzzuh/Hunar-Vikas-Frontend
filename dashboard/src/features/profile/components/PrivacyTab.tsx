import { Toggle } from '@shared/ui.tsx';
import { useUserProfile } from '../hooks/useUserProfile.ts';

export default function PrivacyTab({ userId }: { userId: string }) {
  const { profile, save } = useUserProfile(userId);

  return (
    <div className="privacy-list">
      <Toggle
        checked={profile.privacy.showPhone}
        onChange={(v) => save({ privacy: { showPhone: v } })}
        label="Show my phone number"
        desc="Employers and training partners can see the phone number on your profile."
      />
      <Toggle
        checked={profile.privacy.visibleToEmployers}
        onChange={(v) => save({ privacy: { visibleToEmployers: v } })}
        label="Visible to employers"
        desc="Include this profile in employer search results and recommendations."
      />
      <Toggle
        checked={profile.privacy.shareAnonymisedData}
        onChange={(v) => save({ privacy: { shareAnonymisedData: v } })}
        label="Share anonymised data"
        desc="Help workforce planning with aggregated stats that never identify you."
      />
    </div>
  );
}
