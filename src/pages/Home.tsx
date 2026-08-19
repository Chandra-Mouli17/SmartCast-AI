import type { ReactNode } from 'react'
import {
  Check,
  Gauge,
  Droplets,
  Thermometer,
  Activity,
} from 'lucide-react'
import { useSmartCastData } from '../hooks/useSmartCastData'
import { useSmartCastHealth } from '../hooks/useSmartCastHealth'

function Home() {
  const {
    data,
    loading,
    error,
    simulatorRunning,
    simulatorStarting,
  } = useSmartCastData()

  const {
    data: healthData,
  } = useSmartCastHealth()

  // Simulator is starting
  if (simulatorStarting) {
    return (
      <div className="home">
        <div className="status-ring">
          <div className="status-icon">
            <span className="status-symbol">...</span>
          </div>

          <strong>--</strong>
        </div>

        <div className="home-heading">
          <h1>SmartCast starting...</h1>

          <p>
            Monitoring will begin in a few seconds.
          </p>
        </div>
      </div>
    )
  }

  // Simulator is OFF
  if (!simulatorRunning) {
    return (
      <div className="home">
        <div className="status-ring">
          <div className="status-icon">
            <span className="status-symbol">--</span>
          </div>

          <strong>--</strong>
        </div>

        <div className="home-heading">
          <h1>Monitoring is off</h1>

         <p>
         SmartCast monitoring is currently inactive.
        </p>

          <span className="healthy-badge">
            Device disconnected
          </span>
        </div>

        <div className="sensor-list">
          <Sensor
            icon={<Gauge size={16} />}
            name="Pressure"
            value="--"
            level="normal"
          />

          <Sensor
            icon={<Droplets size={16} />}
            name="Humidity"
            value="--"
            level="normal"
          />

          <Sensor
            icon={<Thermometer size={16} />}
            name="Temperature"
            value="--"
            level="normal"
          />

          <Sensor
            icon={<Activity size={16} />}
            name="Movement"
            value="--"
            level="normal"
          />
        </div>
      </div>
    )
  }

  // Simulator is ON but data is loading
  if (loading) {
    return (
      <div className="home">
        <div className="home-heading">
          <h1>Connecting to SmartCast...</h1>

          <p>
            Loading live sensor data.
          </p>
        </div>
      </div>
    )
  }

  // Backend error
  if (error || !data) {
    return (
      <div className="home">
        <div className="home-heading">
          <h1>Unable to connect</h1>

          <p>
            SmartCast backend is currently unavailable.
          </p>
        </div>
      </div>
    )
  }

  const {
    pressure,
    humidity,
    temperature,
    movement,
  } = data.readings

  const status = data.status

  return (
    <div className={`home ${status.level}`}>
      <div className="status-ring">
        <div className="status-icon">
          {status.level === 'normal' ? (
            <Check size={28} strokeWidth={2.5} />
          ) : (
            <span className="status-symbol">
              !
            </span>
          )}
        </div>

        <strong>
          {healthData
            ? `${healthData.health.score}%`
            : '--'}
        </strong>
      </div>

      <div className="home-heading">
  <h1>{status.title}</h1>

  <p>
    SmartCast monitoring is currently active.
  </p>

  <p>{status.message}</p>

        <span className={`healthy-badge ${status.level}`}>
          {status.level === 'normal' ? (
            <Check size={12} />
          ) : (
            <span>!</span>
          )}

          {status.level === 'normal'
            ? 'Your cast is healthy'
            : status.level === 'warning'
              ? 'Please check your cast'
              : 'Attention needed'}
        </span>
      </div>

      <div className="sensor-list">
        <Sensor
          icon={<Gauge size={16} />}
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

        <Sensor
          icon={<Droplets size={16} />}
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

        <Sensor
          icon={<Thermometer size={16} />}
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

        <Sensor
          icon={<Activity size={16} />}
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
    </div>
  )
}

interface SensorProps {
  icon: ReactNode
  name: string
  value: string
  level: 'normal' | 'warning' | 'critical'
}

function Sensor({
  icon,
  name,
  value,
  level,
}: SensorProps) {
  return (
    <div className="sensor-row">
      <div className="sensor-info">
        <div className="sensor-icon">
          {icon}
        </div>

        <span>{name}</span>
      </div>

      <div className="sensor-status">
        <strong>{value}</strong>

        {value !== '--' && (
          <span className={`sensor-level ${level}`}>
            {level === 'normal' && (
              <>
                Normal <Check size={12} />
              </>
            )}

            {level === 'warning' && (
              <>
                Attention <span>!</span>
              </>
            )}

            {level === 'critical' && (
              <>
                Critical <span>!</span>
              </>
            )}
          </span>
        )}
      </div>
    </div>
  )
}

export default Home