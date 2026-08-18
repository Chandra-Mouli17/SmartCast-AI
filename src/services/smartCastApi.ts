const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

async function request<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`)

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`)
  }

  return response.json() as Promise<T>
}

export { API_BASE_URL, request }
export interface LatestSensorReading {
  id: number
  device_id: string
  pressure: number
  humidity: number
  temperature: number
  motion_x: number
  motion_y: number
  motion_z: number
  created_at: string
}

interface LatestReadingResponse {
  success: boolean
  data: LatestSensorReading
}

export function getLatestReading(deviceId: string) {
  return request<LatestReadingResponse>(
    `/devices/${deviceId}/latest`,
  )
}
export type StatusLevel = 'normal' | 'warning' | 'critical'

export interface DeviceStatusResponse {
  success: boolean
  deviceId: string
  status: {
    level: StatusLevel
    title: string
    message: string
  }
  readings: {
    pressure: number
    humidity: number
    temperature: number
    movement: number
  }
  createdAt: string
}

export function getDeviceStatus(deviceId: string) {
  return request<DeviceStatusResponse>(
    `/devices/${deviceId}/status`,
  )
}
export interface SensorAlert {
  type: 'pressure' | 'humidity' | 'temperature' | 'movement'
  severity: StatusLevel
  title: string
  message: string
  value: number
}

export interface DeviceAlertsResponse {
  success: boolean
  deviceId: string
  alertCount: number
  alerts: SensorAlert[]
  createdAt: string
}

export function getDeviceAlerts(deviceId: string) {
  return request<DeviceAlertsResponse>(
    `/devices/${deviceId}/alerts`,
  )
}
export interface CastHealth {
  score: number
  pressureScore: number
  humidityScore: number
  temperatureScore: number
  movementScore: number
  reasons: string[]
}

export interface DeviceHealthResponse {
  success: boolean
  deviceId: string
  health: CastHealth
  createdAt: string
}

export function getDeviceHealth(deviceId: string) {
  return request<DeviceHealthResponse>(
    `/devices/${deviceId}/health`,
  )
}
export type TrendDirection = 'rising' | 'falling' | 'stable'

export interface TrendResult {
  direction: TrendDirection
  change: number
}

export interface PersistenceResult {
  persistent: boolean
  consecutiveReadings: number
  requiredReadings: number
}

export interface DeviceTrendsResponse {
  success: boolean
  deviceId: string
  readingsAnalyzed: number

  trends: {
    pressure: TrendResult
    humidity: TrendResult
    temperature: TrendResult
    movement: TrendResult
  }

  anomaly: {
    detected: boolean
    severity: 'normal' | 'warning' | 'critical'
    sensors: string[]
    explanation: string
  }

  persistence: {
    pressure: PersistenceResult
    humidity: PersistenceResult
    temperature: PersistenceResult
  }
}

export function getDeviceTrends(deviceId: string) {
  return request<DeviceTrendsResponse>(
    `/devices/${deviceId}/trends`,
  )
}
export interface DeviceReadingsResponse {
  success: boolean
  count: number
  data: LatestSensorReading[]
}

export function getDeviceReadings(deviceId: string) {
  return request<DeviceReadingsResponse>(
    `/devices/${deviceId}/readings`,
  )
}