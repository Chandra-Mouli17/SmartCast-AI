import {
  CalendarDays,
  CheckCircle,
  Cpu,
  LogOut,
  User,
} from 'lucide-react'
import type { ReactNode } from 'react'
import { useState } from 'react'

interface ProfileProps {
  onLogout: () => void
}

function Profile({ onLogout }: ProfileProps) {
  const [patientName, setPatientName] =
    useState('Patient Name')

  const [patientId] =
    useState('SC-P001')

  const [castId] =
    useState('SC-CAST-001')

  const [isEditing, setIsEditing] =
    useState(false)

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
                setPatientName(event.target.value)
              }
              autoFocus
            />
          ) : (
            <h2>{patientName}</h2>
          )}

          <p>Patient ID: {patientId}</p>
        </div>

        <button
          className="profile-edit-button"
          onClick={() =>
            setIsEditing((current) => !current)
          }
        >
          {isEditing ? 'Save' : 'Edit'}
        </button>
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
          value="Connected"
          status
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