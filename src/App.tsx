import { useState } from 'react'
import AppShell from './layouts/AppShell'
import Home from './pages/Home'
import Monitoring from './pages/Monitoring'
import Alerts from './pages/Alerts'
import Profile from './pages/Profile'
import Login from './pages/Login'
type Page = 'login' | 'home' | 'monitoring' | 'alerts' | 'profile'
function App() {
  const [currentPage, setCurrentPage] = useState<Page>('login')

  const [theme, setTheme] =
    useState<'dark' | 'light'>('dark')

 if (currentPage === 'login') {
  return (
    <div className={`theme-${theme}`}>
      <div className="app">
        <main className="content">
          <Login
            onLogin={() => setCurrentPage('home')}
          />
        </main>
      </div>
    </div>
  )
}

return (
  <div className={`theme-${theme}`}>
    <AppShell
      currentPage={currentPage}
      onNavigate={setCurrentPage}
      theme={theme}
      onToggleTheme={() =>
        setTheme((current) =>
          current === 'dark' ? 'light' : 'dark'
        )
      }
    >
      {currentPage === 'home' && <Home />}
      {currentPage === 'monitoring' && <Monitoring />}
      {currentPage === 'alerts' && <Alerts />}
      {currentPage === 'profile' && (
  <Profile
    onLogout={() => setCurrentPage('login')}
  />
)}
    </AppShell>
  </div>
)
}

export default App