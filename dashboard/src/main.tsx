import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@shared/tokens.css'
import './styles/base.css'
import './styles/sidebar.css'
import './styles/topbar.css'
import './styles/hero.css'
import './styles/passport.css'
import './styles/courses.css'
import './styles/rail.css'
import './styles/profile.css'
import './styles/responsive.css'
import './styles/intel.css'
import './styles/reduced-motion.css'
import './styles/intel-responsive.css'
import App from './app/App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
