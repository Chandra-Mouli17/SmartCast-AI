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