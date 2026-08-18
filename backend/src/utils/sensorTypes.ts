export interface SensorReadingInput {
  pressure: number
  humidity: number
  temperature: number
  motionX: number
  motionY: number
  motionZ: number
}

export interface SensorReading extends SensorReadingInput {
  deviceId: string
}