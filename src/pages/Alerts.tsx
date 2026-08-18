import type { ReactNode } from 'react'
import {
  AlertTriangle,
  CheckCircle,
  Droplets,
  Activity,
  Gauge,
  Thermometer,
} from 'lucide-react'
import { useSmartCastAlerts } from '../hooks/useSmartCastAlerts'
import type { SensorAlert } from '../services/smartCastApi'

function Alerts() {
  const { data, loading, error } = useSmartCastAlerts()

  if (loading) {
    return (
      <div className="alerts">
        <div className="page-header">
          <p className="eyebrow">CAST MONITORING</p>
          <h1>Alerts</h1>
          <p className="page-subtitle">
            Loading SmartCast alerts...
          </p>
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="alerts">
        <div className="page-header">
          <p className="eyebrow">CAST MONITORING</p>
          <h1>Alerts</h1>
          <p className="page-subtitle">
            Unable to connect to SmartCast backend
          </p>
        </div>
      </div>
    )
  }

  const alerts = data.alerts
  const hasAlerts = alerts.length > 0

  return (
    <div className="alerts">
      <div className="page-header">
        <p className="eyebrow">CAST MONITORING</p>

        <h1>Alerts</h1>

        <p className="page-subtitle">
          Recent activity from your cast
        </p>
      </div>

      <div
        className={`alert-summary ${
          hasAlerts ? 'has-alerts' : ''
        }`}
      >
        <div className="alert-summary-icon">
          {hasAlerts ? (
            <AlertTriangle size={22} />
          ) : (
            <CheckCircle size={22} />
          )}
        </div>

        <div>
          <h2>
            {hasAlerts
              ? `${alerts.length} active alert${
                  alerts.length > 1 ? 's' : ''
                }`
              : 'No active alerts'}
          </h2>

          <p>
            {hasAlerts
              ? 'Some readings need your attention'
              : 'No abnormal activity detected'}
          </p>
        </div>
      </div>

      <div className="alert-section">
        <h2>Recent activity</h2>

        {!hasAlerts && (
          <AlertCard
            type="normal"
            icon={<CheckCircle size={18} />}
            title="Normal monitoring"
            message="Your cast readings are within the normal range."
            time="Just now"
          />
        )}

        {alerts.map((alert, index) => (
          <AlertCard
            key={`${alert.type}-${index}`}
            type={alert.severity}
            icon={getAlertIcon(alert)}
            title={alert.title}
            message={alert.message}
            time="Just now"
          />
        ))}
      </div>

      <p className="simulation-note">
        Live alerts from SmartCast backend
      </p>
    </div>
  )
}

function getAlertIcon(alert: SensorAlert) {
  switch (alert.type) {
    case 'pressure':
      return <Gauge size={18} />

    case 'humidity':
      return <Droplets size={18} />

    case 'temperature':
      return <Thermometer size={18} />

    case 'movement':
      return <Activity size={18} />

    default:
      return <AlertTriangle size={18} />
  }
}

interface AlertCardProps {
  type: 'normal' | 'warning' | 'critical'
  icon: ReactNode
  title: string
  message: string
  time: string
}

function AlertCard({
  type,
  icon,
  title,
  message,
  time,
}: AlertCardProps) {
  return (
    <div className={`alert-card ${type}`}>
      <div className="alert-icon">
        {icon}
      </div>

      <div className="alert-content">
        <div className="alert-title-row">
          <h3>{title}</h3>

          <span>{time}</span>
        </div>

        <p>{message}</p>
      </div>
    </div>
  )
}

export default Alerts