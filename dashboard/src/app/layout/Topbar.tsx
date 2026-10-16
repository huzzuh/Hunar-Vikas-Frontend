import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext.tsx';
import { useFilters } from '../../context/FilterContext.tsx';
import { useRole } from '../../context/RoleContext.tsx';
import { greeting } from '../../utils/greeting.ts';
import { useUserProfile } from '../../features/profile/index.ts';

export default function Topbar({ onOpenMenu }: { onOpenMenu: () => void }) {
  const { query, setQuery } = useFilters();
  const { profile, firstName } = useRole();
  const { currentUser } = useAuth();
  const { profile: fullProfile } = useUserProfile(currentUser.userId);
  const [showNotif, setShowNotif] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`topbar ${scrolled ? 'scrolled' : ''}`}>
      <button className="icon-btn menu" aria-label="Open menu" onClick={onOpenMenu}>
        <i className="fa-solid fa-bars" aria-hidden="true" />
      </button>
      <div className="greet">
        <span className="sun" aria-hidden="true">
          <i className="fa-solid fa-sun" />
        </span>
        <span>
          <strong>
            {greeting()}, {firstName}!
          </strong>
          <small>Your skills are building your future.</small>
        </span>
      </div>
      <form className="top-search" onSubmit={(e) => e.preventDefault()} role="search">
        <i className="fa-solid fa-magnifying-glass" aria-hidden="true" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search training, opportunities, skills…"
          aria-label="Search dashboard or ask the evidence base"
        />
        <kbd className="search-kbd hide-md" aria-hidden="true">
          /
        </kbd>
        {query && (
          <button type="button" className="clear" onClick={() => setQuery('')} aria-label="Clear search">
            <i className="fa-solid fa-xmark" aria-hidden="true" />
          </button>
        )}
      </form>
      <div className="top-right">
        <div className="notif-wrap">
          <button
            type="button"
            className="icon-btn bell"
            aria-label="Notifications"
            onClick={() => setShowNotif((v) => !v)}
          >
            <i className="fa-regular fa-bell" aria-hidden="true" />
            <span className="bell-dot" aria-hidden="true" />
          </button>
          {showNotif && (
            <div className="popover" role="status">
              <strong>2 new updates</strong>
              <p>
                <i className="fa-solid fa-star" aria-hidden="true" /> New: Solar Installation Technician in
                Pune
              </p>
              <p>
                <i className="fa-solid fa-certificate" aria-hidden="true" /> Complete your profile to unlock 3
                matches
              </p>
            </div>
          )}
        </div>
        <span className="loc hide-md">
          <i className="fa-solid fa-location-dot" aria-hidden="true" /> {profile.place}
        </span>
        <span className="avatar avatar-xs top-avatar" aria-hidden="true">
          {fullProfile.photoUrl ? <img src={fullProfile.photoUrl} alt="" /> : profile.initials}
        </span>
        <span className="demo-pill">Demo Profile</span>
      </div>
    </header>
  );
}
