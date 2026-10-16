import { useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { SkillPassport } from '../../passport/index.ts';
import DetailsTab from './DetailsTab.tsx';
import PrivacyTab from './PrivacyTab.tsx';

const TABS = [
  { id: 'details', label: 'Details' },
  { id: 'skills', label: 'Skills' },
  { id: 'growth', label: 'Growth' },
  { id: 'privacy', label: 'Privacy' },
] as const;

type TabId = (typeof TABS)[number]['id'];

export default function ProfileTabs({ userId }: { userId: string }) {
  const [tab, setTab] = useState<TabId>('details');
  const btnRefs = useRef<Array<HTMLButtonElement | null>>([]);

  function onKeyDown(e: KeyboardEvent, index: number) {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const next = (index + (e.key === 'ArrowRight' ? 1 : -1) + TABS.length) % TABS.length;
    const target = TABS[next];
    if (target) {
      setTab(target.id);
      btnRefs.current[next]?.focus();
    }
  }

  return (
    <section className="panel reveal" aria-label="Profile sections">
      <div className="tabs" role="tablist" aria-label="Profile sections">
        {TABS.map((t, i) => (
          <button
            key={t.id}
            ref={(el) => {
              btnRefs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`tab-${t.id}`}
            aria-selected={tab === t.id}
            aria-controls={`panel-${t.id}`}
            tabIndex={tab === t.id ? 0 : -1}
            className={`tab ${tab === t.id ? 'on' : ''}`}
            onClick={() => setTab(t.id)}
            onKeyDown={(e) => onKeyDown(e, i)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="tab-panel" role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`}>
        {tab === 'details' && <DetailsTab userId={userId} />}
        {tab === 'skills' && (
          <>
            <p className="tab-note">Managed by Skill Passport — edits here reflect everywhere.</p>
            <SkillPassport />
          </>
        )}
        {tab === 'growth' && (
          <p className="empty">
            Growth tracking (timeline, score and chart keyed by your user ID) arrives in Phase C.
          </p>
        )}
        {tab === 'privacy' && <PrivacyTab userId={userId} />}
      </div>
    </section>
  );
}
