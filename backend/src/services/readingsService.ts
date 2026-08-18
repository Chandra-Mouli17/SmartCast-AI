import { supabase } from '../config/supabase'
import { SensorReading } from '../utils/sensorTypes'

export async function saveSensorReading(reading: SensorReading) {
  const { data, error } = await supabase
    .from('sensor_readings')
    .insert({
      device_id: reading.deviceId,
      pressure: reading.pressure,
      humidity: reading.humidity,
      temperature: reading.temperature,
      motion_x: reading.motionX,
      motion_y: reading.motionY,
      motion_z: reading.motionZ,
    })
    .select()
    .single()

  if (error) {
    throw error
  }

  return data
}
export async function getLatestSensorReading(deviceId: string) {
  const { data, error } = await supabase
    .from('sensor_readings')
    .select('*')
    .eq('device_id', deviceId)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (error) {
    throw error
  }

  return data
}
export async function getSensorReadings(
  deviceId: string,
  limit = 50,
) {
  const { data, error } = await supabase
    .from('sensor_readings')
    .select('*')
    .eq('device_id', deviceId)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    throw error
  }

  return data
}