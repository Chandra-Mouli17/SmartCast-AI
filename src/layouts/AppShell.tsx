import {
  Activity,
  Bell,
  Home as HomeIcon,
  User,
} from 'lucide-react'
import type { ReactNode } from 'react'

type Page = 'home' | 'monitoring' | 'alerts' | 'profile'
interface AppShellProps {
  children: ReactNode
  currentPage: Page
  onNavigate: (page: Page) => void
  theme: 'dark' | 'light'
  onToggleTheme: () => void
}

function AppShell({
  children,
  currentPage,
  onNavigate,
  theme,
  onToggleTheme,
}: AppShellProps) {
  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark">⌁</span>
          <span>SMARTCAST AI</span>
        </div>

        <div className="connection">
          <span className="connection-dot" />
          Connected
        </div>
        <button
  className="theme-toggle"
  onClick={onToggleTheme}
  aria-label="Toggle theme"
>
  {theme === 'dark' ? '☀' : '☾'}
</button>
      </header>

      <main className="content">
        {children}
      </main>

      <nav className="bottom-nav">
        <button
          className={`nav-item ${
            currentPage === 'home' ? 'active' : ''
          }`}
          onClick={() => onNavigate('home')}
        >
          <HomeIcon size={18} />
          <span>Home</span>
        </button>

        <button
          className={`nav-item ${
            currentPage === 'monitoring' ? 'active' : ''
          }`}
          onClick={() => onNavigate('monitoring')}
        >
          <Activity size={18} />
          <span>Monitoring</span>
        </button>

        <button
  className={`nav-item ${
    currentPage === 'alerts' ? 'active' : ''
  }`}
  onClick={() => onNavigate('alerts')}
>
  <Bell size={18} />
  <span>Alerts</span>
</button>

       <button
  className={`nav-item ${
    currentPage === 'profile' ? 'active' : ''
  }`}
  onClick={() => onNavigate('profile')}
>
  <User size={18} />
  <span>Profile</span>
</button>
      </nav>
    </div>
  )
}

export default AppShell