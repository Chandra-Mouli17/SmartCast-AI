import { getSensorLevel } from '../utils/status'
import { useSmartCastData } from '../hooks/useSmartCastData'
import { useSmartCastTrends } from '../hooks/useSmartCastTrends'
import {
  Activity,
  Battery,
  Check,
  Droplets,
  Gauge,
  Signal,
  Thermometer,
} from 'lucide-react'
import { mockDevice } from '../data/mockSensorData'

function Monitoring() {
 const { data, loading, error } = useSmartCastData()
 const {
  data: trendData,
  loading: trendsLoading,
  error: trendsError,
} = useSmartCastTrends()

const pressure = data?.readings.pressure ?? 0
const humidity = data?.readings.humidity ?? 0
const temperature = data?.readings.temperature ?? 0
const movement = data?.readings.movement ?? 0

const deviceConnected = !loading && !error && !!data

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
        <span
          className={`device-dot ${
            deviceConnected
              ? 'connected'
              : 'disconnected'
          }`}
        />

        <strong>
          {deviceConnected
            ? 'DEVICE CONNECTED'
            : 'DEVICE DISCONNECTED'}
        </strong>
      </div>

      <div className="monitoring-list">
        <MonitoringCard
          icon={<Gauge size={18} />}
          name="Pressure"
          value={`${pressure}%`}
          level={getSensorLevel(pressure, 85, 95)}
        />

        <MonitoringCard
          icon={<Droplets size={18} />}
          name="Humidity"
          value={`${humidity}%`}
          level={getSensorLevel(humidity, 70, 85)}
        />

        <MonitoringCard
          icon={<Thermometer size={18} />}
          name="Temperature"
          value={`${temperature}°C`}
          level={getSensorLevel(temperature, 37.5, 39)}
        />

        <MonitoringCard
          icon={<Activity size={18} />}
          name="Movement"
          value={movement < 40 ? 'Low' : 'High'}
          level={getSensorLevel(movement, 70, 90)}
        />
      </div>
            <div className="device-info">
  <h2>SmartCast analysis</h2>

  {trendsLoading && (
    <p>Analyzing recent sensor readings...</p>
  )}

  {trendsError && (
    <p>Unable to load sensor analysis.</p>
  )}

  {trendData && (
    <>
      <p>
        Pressure trend:{' '}
        <strong>{trendData.trends.pressure.direction}</strong>
      </p>

      <p>
        Humidity trend:{' '}
        <strong>{trendData.trends.humidity.direction}</strong>
      </p>

      <p>
        Temperature trend:{' '}
        <strong>{trendData.trends.temperature.direction}</strong>
      </p>

      <p>
        Movement trend:{' '}
        <strong>{trendData.trends.movement.direction}</strong>
      </p>

      <p>
        Multi-sensor pattern:{' '}
        <strong>
          {trendData.anomaly.detected
            ? trendData.anomaly.severity.toUpperCase()
            : 'NORMAL'}
        </strong>
      </p>

      <p>
        {trendData.anomaly.explanation}
      </p>
      {trendData.persistence.temperature.persistent && (
  <p>
    <strong>Persistent temperature:</strong>{' '}
    Temperature has remained elevated for{' '}
    {trendData.persistence.temperature.consecutiveReadings}{' '}
    consecutive readings.
  </p>
)}

{trendData.persistence.pressure.persistent && (
  <p>
    <strong>Persistent pressure:</strong>{' '}
    Pressure has remained elevated for{' '}
    {trendData.persistence.pressure.consecutiveReadings}{' '}
    consecutive readings.
  </p>
)}

{trendData.persistence.humidity.persistent && (
  <p>
    <strong>Persistent humidity:</strong>{' '}
    Humidity has remained elevated for{' '}
    {trendData.persistence.humidity.consecutiveReadings}{' '}
    consecutive readings.
  </p>
)}
    </>
  )}
</div>
      <div className="device-info">
        <h2>Device information</h2>

        <div className="device-info-row">
          <div className="device-info-item">
            <Signal size={15} />
            <div>
              <span>Signal</span>
              <strong>
                {mockDevice.signalStrength}%
              </strong>
            </div>
          </div>

          <div className="device-info-item">
            <Battery size={15} />
            <div>
              <span>Battery</span>
              <strong>
                {mockDevice.battery}%   
              </strong>
            </div>
          </div>
        </div>

        <p className="device-id">
          Device ID: {mockDevice.deviceId}
        </p>
      </div>

      <p className="simulation-note">
  {loading
    ? 'Connecting to SmartCast...'
    : error
      ? 'Unable to connect to SmartCast backend'
      : 'Live sensor data'}
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

          <span
            className={`monitoring-status ${level}`}
          >
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