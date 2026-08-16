import {
  Activity,
  Check,
  Droplets,
  Gauge,
  Thermometer,
} from 'lucide-react'
import { mockSensorData } from '../data/mockSensorData'

function Monitoring() {
  const {
    pressure,
    humidity,
    temperature,
    movement,
  } = mockSensorData

  return (
    <div className="monitoring">
      <div className="page-header">
        <p className="eyebrow">CAST MONITORING</p>
        <h1>Monitoring</h1>
        <p className="page-subtitle">
          Live sensor status
        </p>
      </div>

      <div className="device-status">
        <span className="device-dot" />
        Device connected
      </div>

      <div className="monitoring-list">
        <MonitoringCard
          icon={<Gauge size={18} />}
          name="Pressure"
          value={`${pressure}%`}
          level={
            pressure >= 95
              ? 'critical'
              : pressure >= 85
                ? 'warning'
                : 'normal'
          }
        />

        <MonitoringCard
          icon={<Droplets size={18} />}
          name="Humidity"
          value={`${humidity}%`}
          level={
            humidity >= 85
              ? 'critical'
              : humidity >= 70
                ? 'warning'
                : 'normal'
          }
        />

        <MonitoringCard
          icon={<Thermometer size={18} />}
          name="Temperature"
          value={`${temperature}°C`}
          level={
            temperature >= 39
              ? 'critical'
              : temperature >= 37.5
                ? 'warning'
                : 'normal'
          }
        />

        <MonitoringCard
          icon={<Activity size={18} />}
          name="Movement"
          value={movement < 40 ? 'Low' : 'High'}
          level={
            movement >= 90
              ? 'critical'
              : movement >= 70
                ? 'warning'
                : 'normal'
          }
        />
      </div>

      <p className="simulation-note">
        Simulated data for development
      </p>
    </div>
  )
}

interface MonitoringCardProps {
  icon: React.ReactNode
  name: string
  value: string
  level: 'normal' | 'warning' | 'critical'
}

function MonitoringCard({
  icon,
  name,
  value,
  level,
}: MonitoringCardProps) {
  return (
    <div className={`monitoring-card ${level}`}>
      <div className="monitoring-left">
        <div className="monitoring-icon">
          {icon}
        </div>

        <div>
          <h2>{name}</h2>

          <span className={`monitoring-status ${level}`}>
            {level === 'normal' && (
              <>
                <Check size={12} />
                Normal
              </>
            )}

            {level === 'warning' && (
              <>
                <span>!</span>
                Attention
              </>
            )}

            {level === 'critical' && (
              <>
                <span>!</span>
                Critical
              </>
            )}
          </span>
        </div>
      </div>

      <strong className="monitoring-value">
        {value}
      </strong>
    </div>
  )
}

export default Monitoring