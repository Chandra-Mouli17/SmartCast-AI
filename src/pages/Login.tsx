import { useState } from 'react'
import {
  ArrowRight,
  LockKeyhole,
  Mail,
} from 'lucide-react'
import {
  loginUser,
  signUpUser,
} from '../services/authService'

interface LoginProps {
  onLogin: () => void
}

function Login({ onLogin }: LoginProps) {
  const [mode, setMode] =
    useState<'login' | 'signup'>('login')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault()

    setLoading(true)
    setError('')
    setMessage('')

    try {
      if (mode === 'signup') {
        const result = await signUpUser(
          email.trim(),
          password,
        )

        if (result.session) {
          onLogin()
          return
        }

        setMessage(
          'Account created successfully. Please check your email to confirm your account.',
        )

        setMode('login')
        setPassword('')
      } else {
        await loginUser(
          email.trim(),
          password,
        )

        onLogin()
      }
    } catch (err) {
      console.error('Authentication failed:', err)

      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Authentication failed. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login">
      <div className="login-logo">
        <div className="logo-placeholder">
          SC
        </div>

        <span>SMARTCAST AI</span>
      </div>

      <div className="login-heading">
        <p className="eyebrow">
          PATIENT PORTAL
        </p>

        <h1>
          {mode === 'login'
            ? 'Welcome back'
            : 'Create account'}
        </h1>

        <p>
          {mode === 'login'
            ? 'Monitor your cast with confidence.'
            : 'Create your SmartCast patient account.'}
        </p>
      </div>

      <form
        className="login-form"
        onSubmit={handleSubmit}
      >
        <label>
          Email
        </label>

        <div className="input-wrapper">
          <Mail size={16} />

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            required
          />
        </div>

        <label>
          Password
        </label>

        <div className="input-wrapper">
          <LockKeyhole size={16} />

          <input
            type="password"
            placeholder={
              mode === 'login'
                ? 'Enter your password'
                : 'Create a password'
            }
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
            required
          />
        </div>

        {error && (
          <p className="login-note">
            {error}
          </p>
        )}

        {message && (
          <p className="login-note">
            {message}
          </p>
        )}

        <button
          type="submit"
          className="login-button"
          disabled={loading}
        >
          {loading
            ? 'Please wait...'
            : mode === 'login'
              ? 'Login'
              : 'Create account'}

          {!loading && (
            <ArrowRight size={16} />
          )}
        </button>
      </form>

      <button
        type="button"
        className="skip-button"
        onClick={() => {
          setMode(
            mode === 'login'
              ? 'signup'
              : 'login',
          )

          setError('')
          setMessage('')
        }}
      >
        {mode === 'login'
          ? 'New user? Sign up'
          : 'Already have an account? Login'}
      </button>

      <p className="login-note">
        Your monitoring data stays private and secure.
      </p>
    </div>
  )
}

export default Login