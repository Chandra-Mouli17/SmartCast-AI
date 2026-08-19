import { getSensorLevel } from '../utils/status'
import { useSmartCastData } from '../hooks/useSmartCastData'
import { useSmartCastTrends } from '../hooks/useSmartCastTrends'
import { useSmartCastHistory } from '../hooks/useSmartCastHistory'
import SensorHistoryChart from '../components/SensorHistoryChart'

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
  const {
    data,
    loading,
    error,
    simulatorRunning,
    simulatorStarting,
  } = useSmartCastData()

  const {
    data: historyData,
    loading: historyLoading,
    error: historyError,
  } = useSmartCastHistory()

  const {
    data: trendData,
    loading: trendsLoading,
    error: trendsError,
  } = useSmartCastTrends()

  const pressure = data?.readings.pressure ?? 0
  const humidity = data?.readings.humidity ?? 0
  const temperature = data?.readings.temperature ?? 0
  const movement = data?.readings.movement ?? 0

  const deviceConnected =
    simulatorRunning &&
    !loading &&
    !error &&
    !!data

  return (
    <div className="monitoring">
      {/* PAGE HEADER */}
      <div className="page-header">
        <p className="eyebrow">
          CAST MONITORING
        </p>

        <h1>Monitoring</h1>

        <p className="page-subtitle">
          Live sensor status
        </p>
      </div>

      {/* DEVICE CONNECTION */}
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

      {/* SENSOR VALUES */}
      <div className="monitoring-list">
        <MonitoringCard
          icon={<Gauge size={18} />}
          name="Pressure"
          value={
            deviceConnected
              ? `${pressure}%`
              : '--'
          }
          level={
            deviceConnected
              ? getSensorLevel(
                  pressure,
                  85,
                  95,
                )
              : 'normal'
          }
        />

        <MonitoringCard
          icon={<Droplets size={18} />}
          name="Humidity"
          value={
            deviceConnected
              ? `${humidity}%`
              : '--'
          }
          level={
            deviceConnected
              ? getSensorLevel(
                  humidity,
                  70,
                  85,
                )
              : 'normal'
          }
        />

        <MonitoringCard
          icon={<Thermometer size={18} />}
          name="Temperature"
          value={
            deviceConnected
              ? `${temperature}°C`
              : '--'
          }
          level={
            deviceConnected
              ? getSensorLevel(
                  temperature,
                  37.5,
                  39,
                )
              : 'normal'
          }
        />

        <MonitoringCard
          icon={<Activity size={18} />}
          name="Movement"
          value={
            deviceConnected
              ? movement < 40
                ? 'Low'
                : 'High'
              : '--'
          }
          level={
            deviceConnected
              ? getSensorLevel(
                  movement,
                  70,
                  90,
                )
              : 'normal'
          }
        />
      </div>

      {/* SMARTCAST ANALYSIS */}
      <div className="device-info">
        <h2>SmartCast analysis</h2>

        {!simulatorRunning && (
          <p>
            Start SmartCast monitoring to
            view live analysis.
          </p>
        )}

        {simulatorRunning &&
          trendsLoading && (
            <p>
              Analyzing recent sensor
              readings...
            </p>
          )}

        {simulatorRunning &&
          trendsError && (
            <p>
              Unable to load sensor
              analysis.
            </p>
          )}

        {simulatorRunning &&
          trendData && (
            <>
              <p>
                Pressure trend:{' '}
                <strong>
                  {
                    trendData.trends
                      .pressure.direction
                  }
                </strong>
              </p>

              <p>
                Humidity trend:{' '}
                <strong>
                  {
                    trendData.trends
                      .humidity.direction
                  }
                </strong>
              </p>

              <p>
                Temperature trend:{' '}
                <strong>
                  {
                    trendData.trends
                      .temperature.direction
                  }
                </strong>
              </p>

              <p>
                Movement trend:{' '}
                <strong>
                  {
                    trendData.trends
                      .movement.direction
                  }
                </strong>
              </p>

              <p>
                Multi-sensor pattern:{' '}
                <strong>
                  {trendData.anomaly
                    .detected
                    ? trendData.anomaly.severity.toUpperCase()
                    : 'NORMAL'}
                </strong>
              </p>

              <p>
                {
                  trendData.anomaly
                    .explanation
                }
              </p>

              {trendData.persistence
                .temperature
                .persistent && (
                <p>
                  <strong>
                    Persistent
                    temperature:
                  </strong>{' '}
                  Temperature has
                  remained elevated for{' '}
                  {
                    trendData
                      .persistence
                      .temperature
                      .consecutiveReadings
                  }{' '}
                  consecutive readings.
                </p>
              )}

              {trendData.persistence
                .pressure
                .persistent && (
                <p>
                  <strong>
                    Persistent pressure:
                  </strong>{' '}
                  Pressure has remained
                  elevated for{' '}
                  {
                    trendData
                      .persistence
                      .pressure
                      .consecutiveReadings
                  }{' '}
                  consecutive readings.
                </p>
              )}

              {trendData.persistence
                .humidity
                .persistent && (
                <p>
                  <strong>
                    Persistent humidity:
                  </strong>{' '}
                  Humidity has remained
                  elevated for{' '}
                  {
                    trendData
                      .persistence
                      .humidity
                      .consecutiveReadings
                  }{' '}
                  consecutive readings.
                </p>
              )}
            </>
          )}
      </div>

      {/* SENSOR HISTORY */}
      <div className="device-info">
        <h2>Sensor history</h2>

        {!simulatorRunning && (
          <p>
            Start SmartCast monitoring to
            view sensor history.
          </p>
        )}

        {simulatorRunning &&
          historyLoading && (
            <p>
              Loading sensor history...
            </p>
          )}

        {simulatorRunning &&
          historyError && (
            <p>
              Unable to load sensor
              history.
            </p>
          )}

        {simulatorRunning &&
          historyData &&
          historyData.data.length > 0 && (
            <SensorHistoryChart
              readings={historyData.data}
            />
          )}
      </div>

      {/* DEVICE INFORMATION */}
      <div className="device-info">
        <h2>Device information</h2>

        <div className="device-info-row">
          <div className="device-info-item">
            <Signal size={15} />

            <div>
              <span>Signal</span>

              <strong>
                {deviceConnected
                  ? `${mockDevice.signalStrength}%`
                  : '--'}
              </strong>
            </div>
          </div>

          <div className="device-info-item">
            <Battery size={15} />

            <div>
              <span>Battery</span>

              <strong>
                {deviceConnected
                  ? `${mockDevice.battery}%`
                  : '--'}
              </strong>
            </div>
          </div>
        </div>

        <p className="device-id">
          Device ID:{' '}
          {mockDevice.deviceId}
        </p>
      </div>

      {/* SIMULATOR STATE */}
      <p className="simulation-note">
        {simulatorStarting
          ? 'SmartCast starting...'
          : simulatorRunning
            ? 'Live simulated sensor data'
            : 'SmartCast monitoring is off'}
      </p>
    </div>
  )
}

interface MonitoringCardProps {
  icon: React.ReactNode
  name: string
  value: string
  level:
    | 'normal'
    | 'warning'
    | 'critical'
}

function MonitoringCard({
  icon,
  name,
  value,
  level,
}: MonitoringCardProps) {
  return (
    <div
      className={`monitoring-card ${level}`}
    >
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