import {
  CalendarDays,
  CheckCircle,
  Cpu,
  LogOut,
  Mail,
  User,
} from 'lucide-react'
import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'
import {
  getCurrentUser,
  updateUserName,
} from '../services/authService'
import { useSmartCastData } from '../hooks/useSmartCastData'

interface ProfileProps {
  onLogout: () => void
}

function Profile({ onLogout }: ProfileProps) {
  const [patientName, setPatientName] = useState('')
  const [email, setEmail] = useState('')
  const [patientId, setPatientId] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [saving, setSaving] = useState(false)

  const {
    simulatorRunning,
  } = useSmartCastData()

  const castId = 'SC-CAST-001'

  useEffect(() => {
    async function loadProfile() {
      try {
        const user = await getCurrentUser()

        if (!user) {
          return
        }

        setEmail(user.email ?? '')

        setPatientName(
          user.user_metadata?.full_name ||
            user.email?.split('@')[0] ||
            'SmartCast Patient',
        )

        setPatientId(
          `SC-${user.id.slice(0, 8).toUpperCase()}`,
        )
      } catch (error) {
        console.error(
          'Failed to load user profile:',
          error,
        )
      }
    }

    loadProfile()
  }, [])

  async function handleEdit() {
    if (!isEditing) {
      setIsEditing(true)
      return
    }

    try {
      setSaving(true)

      await updateUserName(
        patientName.trim(),
      )

      setIsEditing(false)
    } catch (error) {
      console.error(
        'Failed to update patient name:',
        error,
      )
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="profile">
      <div className="page-header">
        <p className="eyebrow">ACCOUNT</p>

        <h1>Profile</h1>

        <p className="page-subtitle">
          Your monitoring information
        </p>
      </div>

      <div className="profile-card">
        <div className="profile-avatar">
          <User size={24} />
        </div>

        <div className="profile-main">
          {isEditing ? (
            <input
              className="profile-name-input"
              value={patientName}
              onChange={(event) =>
                setPatientName(
                  event.target.value,
                )
              }
              autoFocus
            />
          ) : (
            <h2>{patientName}</h2>
          )}

          <p>
            Patient ID: {patientId}
          </p>
        </div>

        <button
          className="profile-edit-button"
          onClick={handleEdit}
          disabled={saving}
        >
          {saving
            ? 'Saving...'
            : isEditing
              ? 'Save'
              : 'Edit'}
        </button>
      </div>

      <div className="profile-section">
        <h2>Account information</h2>

        <InfoRow
          icon={<Mail size={17} />}
          label="Email"
          value={email || '--'}
        />
      </div>

      <div className="profile-section">
        <h2>Cast information</h2>

        <InfoRow
          icon={<Cpu size={17} />}
          label="Cast / Device ID"
          value={castId}
        />

        <InfoRow
          icon={<CalendarDays size={17} />}
          label="Monitoring started"
          value="15 Aug 2026"
        />

        <InfoRow
          icon={<CheckCircle size={17} />}
          label="Device status"
          value={
            simulatorRunning
              ? 'Connected'
              : 'Disconnected'
          }
          status={simulatorRunning}
        />
      </div>

      <button
        className="logout-button"
        onClick={onLogout}
      >
        <LogOut size={16} />
        Sign out
      </button>
    </div>
  )
}

interface InfoRowProps {
  icon: ReactNode
  label: string
  value: string
  status?: boolean
}

function InfoRow({
  icon,
  label,
  value,
  status = false,
}: InfoRowProps) {
  return (
    <div className="info-row">
      <div className="info-left">
        <div className="info-icon">
          {icon}
        </div>

        <span>{label}</span>
      </div>

      <strong
        className={
          status ? 'connected-text' : ''
        }
      >
        {value}
      </strong>
    </div>
  )
}

export default Profile