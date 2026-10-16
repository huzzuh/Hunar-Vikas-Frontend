import { useState } from 'react';
import type { CSSProperties } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Logo from '@shared/Logo.tsx';
import { NAV, NAV_GROUPS } from '../../config/navigation.ts';
import { useAuth } from '../../context/AuthContext.tsx';
import { useRole } from '../../context/RoleContext.tsx';
import { useToastContext } from '../../context/ToastContext.tsx';
import { useUserProfile } from '../../features/profile/index.ts';

type SidebarProps = {
  open: boolean;
  onClose: () => void;
  onSetupProfile: () => void;
  onOpenSettings: () => void;
};

export default function Sidebar({ open, onClose, onSetupProfile, onOpenSettings }: SidebarProps) {
  const { profile, nextProfile } = useRole();
  const { currentUser } = useAuth();
  const { profile: fullProfile } = useUserProfile(currentUser.userId);
  const { notify } = useToastContext();
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  const photo = fullProfile.photoUrl;

  /* Stagger delay for the sidebar entrance choreography */
  const d = (ms: number): CSSProperties => ({ '--d': `${ms}ms` }) as unknown as CSSProperties;

  function switchProfile() {
    const name = nextProfile();
    setShowProfile(false);
    notify(`Switched to ${name} (demo)`);
  }

  return (
    <>
      {/* Sidebar — same dark green as landing/auth primary */}
      <aside className={`side ${open ? 'open' : ''}`} aria-label="Dashboard navigation">
        <div className="side-top anim" style={d(0)}>
          <Logo dark tagline="Every Skill Deserves an Opportunity." />
        </div>
        <nav className="side-nav">
          {NAV_GROUPS.map((g, gi) => (
            <div key={g} className="nav-group anim" style={d(110 + gi * 70)}>
              <p className="nav-heading">{g}</p>
              {NAV.filter((n) => n.group === g && n.path !== undefined).map((n, ii) => (
                <NavLink
                  key={n.id}
                  to={n.path ?? '/'}
                  onClick={onClose}
                  className={({ isActive }) => `side-link anim ${isActive ? 'active' : ''}`}
                  style={d(140 + gi * 70 + ii * 35)}
                >
                  <i className={n.icon} aria-hidden="true" />
                  <span>{n.label}</span>
                  {n.id === 'demand' && <em className="live-dot" aria-label="Live" />}
                </NavLink>
              ))}
            </div>
          ))}
          <div className="nav-group anim" style={d(320)}>
            <p className="nav-heading">Workspace</p>
            <button
              type="button"
              className="side-link anim"
              style={d(350)}
              onClick={() => {
                onClose();
                onOpenSettings();
              }}
            >
              <i className="fa-solid fa-gear" aria-hidden="true" />
              <span>Settings</span>
            </button>
          </div>
        </nav>
        <div className="profile-anchor anim" style={d(460)}>
          {showProfile && (
            <div className="profile-pop" role="dialog" aria-label="Profile">
              <div className="side-user">
                <span className="avatar avatar-swap" key={profile.initials} aria-hidden="true">
                  {photo ? <img src={photo} alt="" /> : profile.initials}
                  <span className="online-dot" />
                </span>
                <span className="side-user-text">
                  <span className="name-row">
                    <strong>{profile.name}</strong>
                    <span className="demo-pill">Demo</span>
                  </span>
                  <small>{profile.role}</small>
                  <small className="place">
                    <i className="fa-solid fa-location-dot" aria-hidden="true" /> {profile.place}
                  </small>
                </span>
              </div>
              <button type="button" className="btn btn-primary btn-sm btn-full" onClick={switchProfile}>
                <i className="fa-solid fa-users" aria-hidden="true" /> Switch Profile
              </button>
              <button
                type="button"
                className="btn btn-outline btn-sm btn-full"
                onClick={() => {
                  setShowProfile(false);
                  onClose();
                  navigate('/profile');
                }}
              >
                <i className="fa-solid fa-user" aria-hidden="true" /> View Profile
              </button>
              <button
                type="button"
                className="btn btn-outline btn-sm btn-full"
                onClick={() => {
                  setShowProfile(false);
                  onSetupProfile();
                }}
              >
                Complete Your Profile <i className="fa-solid fa-arrow-right" aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      </aside>
      {showProfile && <div className="profile-scrim" onClick={() => setShowProfile(false)} aria-hidden="true" />}
    </>
  );
}
