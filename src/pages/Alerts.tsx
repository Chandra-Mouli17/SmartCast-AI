import type { ReactNode } from 'react'
import {
  AlertTriangle,
  CheckCircle,
  Droplets,
  Activity,
  Gauge,
  Thermometer,
} from 'lucide-react'
import { mockSensorData } from '../data/mockSensorData'

function Alerts() {
  const {
    pressure,
    humidity,
    temperature,
    movement,
  } = mockSensorData

  const alerts = []

  if (pressure >= 85) {
    alerts.push({
      type: pressure >= 95 ? 'critical' : 'warning',
      icon: <Gauge size={18} />,
      title:
        pressure >= 95
          ? 'Critical pressure detected'
          : 'High pressure detected',
      message: `Pressure is currently ${pressure}%.`,
      time: 'Just now',
    })
  }

  if (humidity >= 70) {
    alerts.push({
      type: humidity >= 85 ? 'critical' : 'warning',
      icon: <Droplets size={18} />,
      title:
        humidity >= 85
          ? 'Critical humidity detected'
          : 'High humidity detected',
      message: `Humidity is currently ${humidity}%.`,
      time: 'Just now',
    })
  }

  if (temperature >= 37.5) {
    alerts.push({
      type: temperature >= 39 ? 'critical' : 'warning',
      icon: <Thermometer size={18} />,
      title:
        temperature >= 39
          ? 'Critical temperature detected'
          : 'High temperature detected',
      message: `Temperature is currently ${temperature}°C.`,
      time: 'Just now',
    })
  }

  if (movement >= 70) {
    alerts.push({
      type: movement >= 90 ? 'critical' : 'warning',
      icon: <Activity size={18} />,
      title:
        movement >= 90
          ? 'Critical movement detected'
          : 'Unusual movement detected',
      message: 'Increased movement was detected.',
      time: 'Just now',
    })
  }

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
            key={`${alert.title}-${index}`}
            type={alert.type as AlertCardProps['type']}
            icon={alert.icon}
            title={alert.title}
            message={alert.message}
            time={alert.time}
          />
        ))}
      </div>

      <p className="simulation-note">
        Simulated alerts for development
      </p>
    </div>
  )
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