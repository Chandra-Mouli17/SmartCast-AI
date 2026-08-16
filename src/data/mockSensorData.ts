export interface SensorData {
  pressure: number
  humidity: number
  temperature: number
  movement: number
}

export const mockSensorData: SensorData = {
  pressure: 72,
  humidity: 45,
  temperature: 36.8,
  movement: 20,
}
export const mockDevice = {
  connected: true,
  deviceId: 'SC-CAST-001',
  signalStrength: 92,
  battery: 87,
}