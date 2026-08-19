import { useEffect, useState } from 'react'
import AppShell from './layouts/AppShell'
import Home from './pages/Home'
import Monitoring from './pages/Monitoring'
import Alerts from './pages/Alerts'
import Profile from './pages/Profile'
import Login from './pages/Login'
import { useSimulatorControl } from './hooks/useSimulatorControl'
import { supabase } from './lib/supabase'
import { logoutUser } from './services/authService'

type Page =
  | 'login'
  | 'home'
  | 'monitoring'
  | 'alerts'
  | 'profile'

function App() {
  const [currentPage, setCurrentPage] =
    useState<Page>('login')

  const [authChecked, setAuthChecked] =
    useState(false)

  const [theme, setTheme] =
    useState<'dark' | 'light'>('dark')

  useSimulatorControl()

  useEffect(() => {
    let active = true

    async function checkSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!active) {
        return
      }

      if (session) {
        setCurrentPage('home')
      } else {
        setCurrentPage('login')
      }

      setAuthChecked(true)
    }

    checkSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!active) {
          return
        }

        if (session) {
          setCurrentPage((current) =>
            current === 'login'
              ? 'home'
              : current,
          )
        } else {
          setCurrentPage('login')
        }

        setAuthChecked(true)
      },
    )

    return () => {
      active = false
      subscription.unsubscribe()
    }
  }, [])

  async function handleLogout() {
    try {
      await logoutUser()
      setCurrentPage('login')
    } catch (error) {
      console.error(
        'Failed to sign out:',
        error,
      )
    }
  }

  if (!authChecked) {
    return (
      <div className={`theme-${theme}`}>
        <div className="app">
          <main className="content">
            <div className="login">
              <div className="login-heading">
                <h1>SmartCast AI</h1>
                <p>Checking your session...</p>
              </div>
            </div>
          </main>
        </div>
      </div>
    )
  }

  if (currentPage === 'login') {
    return (
      <div className={`theme-${theme}`}>
        <div className="app">
          <main className="content">
            <Login
              onLogin={() =>
                setCurrentPage('home')
              }
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
            current === 'dark'
              ? 'light'
              : 'dark',
          )
        }
      >
        {currentPage === 'home' && (
          <Home />
        )}

        {currentPage === 'monitoring' && (
          <Monitoring />
        )}

        {currentPage === 'alerts' && (
          <Alerts />
        )}

        {currentPage === 'profile' && (
          <Profile
            onLogout={handleLogout}
          />
        )}
      </AppShell>
    </div>
  )
}

export default App