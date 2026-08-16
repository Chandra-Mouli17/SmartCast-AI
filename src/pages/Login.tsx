import { ArrowRight, LockKeyhole, User } from 'lucide-react'

interface LoginProps {
  onLogin: () => void
}

function Login({ onLogin }: LoginProps) {
  return (
    <div className="login">
      <div className="login-logo">
        {/* Your SmartCast logo will go here */}
        <div className="logo-placeholder">
          SC
        </div>

        <span>SMARTCAST AI</span>
      </div>

      <div className="login-heading">
        <p className="eyebrow">PATIENT PORTAL</p>

        <h1>Welcome back</h1>

        <p>
          Monitor your cast with confidence.
        </p>
      </div>

      <form
        className="login-form"
        onSubmit={(event) => {
          event.preventDefault()
          onLogin()
        }}
      >
        <label>
          Patient ID
        </label>

        <div className="input-wrapper">
          <User size={16} />

          <input
            type="text"
            placeholder="Enter your patient ID"
          />
        </div>

        <label>
          Password
        </label>

        <div className="input-wrapper">
          <LockKeyhole size={16} />

          <input
            type="password"
            placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          className="login-button"
        >
          Login
          <ArrowRight size={16} />
        </button>
      </form>

      <button
        className="skip-button"
        onClick={onLogin}
      >
        Skip for now
      </button>

      <p className="login-note">
        Your monitoring data stays private and secure.
      </p>
    </div>
  )
}

export default Login