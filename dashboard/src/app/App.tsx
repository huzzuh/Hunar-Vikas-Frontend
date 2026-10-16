import { useState } from 'react';
import { HashRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext.tsx';
import { FilterProvider } from '../context/FilterContext.tsx';
import { RoleProvider } from '../context/RoleContext.tsx';
import { ToastProvider, ToastViewport } from '../context/ToastContext.tsx';
import { ProfileSetup } from '../features/profile/index.ts';
import ContextBar from './layout/ContextBar.tsx';
import Footer from './layout/Footer.tsx';
import { SettingsModal } from './layout/SettingsModal.tsx';
import Sidebar from './layout/Sidebar.tsx';
import Topbar from './layout/Topbar.tsx';
import AppRoutes from './router.tsx';

/**
 * App shell: providers + layout + routes only. All domain state lives in
 * contexts (role, filters, toast) and owning feature hooks.
 */
function Shell() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showSetup, setShowSetup] = useState(false);

  function openSetup() {
    setSidebarOpen(false);
    setShowSetup(true);
  }

  return (
    <div className="dash">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onSetupProfile={openSetup}
        onOpenSettings={() => setShowSettings(true)}
      />
      <div
        className={`scrim ${sidebarOpen ? 'show' : ''}`}
        onClick={() => setSidebarOpen(false)}
        aria-hidden="true"
      />

      <div className="main">
        <Topbar onOpenMenu={() => setSidebarOpen(true)} />
        <ContextBar />
        <div className="content">
          <AppRoutes />
        </div>
        <Footer />
      </div>

      {showSetup && <ProfileSetup onClose={() => setShowSetup(false)} />}
      {showSettings && <SettingsModal onDone={() => setShowSettings(false)} />}
      <ToastViewport />
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <ToastProvider>
        <FilterProvider>
          <RoleProvider>
            <AuthProvider>
              <Shell />
            </AuthProvider>
          </RoleProvider>
        </FilterProvider>
      </ToastProvider>
    </HashRouter>
  );
}
