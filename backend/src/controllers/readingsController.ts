import { Request, Response } from 'express'
import {
  SensorReading,
  SensorReadingInput,
} from '../utils/sensorTypes'
import {
  saveSensorReading,
  getLatestSensorReading,
  getSensorReadings,
} from '../services/readingsService'

export async function createReading(req: Request, res: Response) {
  const deviceId = req.params.deviceId

  if (typeof deviceId !== 'string' || !deviceId.trim()) {
    return res.status(400).json({
      success: false,
      message: 'Invalid device ID',
    })
  }

  const body = req.body as SensorReadingInput

  if (
    typeof body.pressure !== 'number' ||
    typeof body.humidity !== 'number' ||
    typeof body.temperature !== 'number' ||
    typeof body.motionX !== 'number' ||
    typeof body.motionY !== 'number' ||
    typeof body.motionZ !== 'number'
  ) {
    return res.status(400).json({
      success: false,
      message: 'Invalid sensor reading data',
    })
  }

  const reading: SensorReading = {
    deviceId,
    ...body,
  }

  try {
    const savedReading = await saveSensorReading(reading)

    return res.status(201).json({
      success: true,
      message: 'Sensor reading saved',
      data: savedReading,
    })
  } catch (error) {
    console.error('Failed to save sensor reading:', error)

    return res.status(500).json({
      success: false,
      message: 'Failed to save sensor reading',
    })
  }
}

export async function getLatestReading(req: Request, res: Response) {
  const deviceId = req.params.deviceId

  if (typeof deviceId !== 'string' || !deviceId.trim()) {
    return res.status(400).json({
      success: false,
      message: 'Invalid device ID',
    })
  }

  try {
    const reading = await getLatestSensorReading(deviceId)

    if (!reading) {
      return res.status(404).json({
        success: false,
        message: 'No sensor readings found',
      })
    }

    return res.json({
      success: true,
      data: reading,
    })
  } catch (error) {
    console.error('Failed to get latest sensor reading:', error)

    return res.status(500).json({
      success: false,
      message: 'Failed to get latest sensor reading',
    })
  }
}
export async function getReadingHistory(req: Request, res: Response) {
  const deviceId = req.params.deviceId

  if (typeof deviceId !== 'string' || !deviceId.trim()) {
    return res.status(400).json({
      success: false,
      message: 'Invalid device ID',
    })
  }

  try {
    const readings = await getSensorReadings(deviceId)

    return res.json({
      success: true,
      count: readings.length,
      data: readings,
    })
  } catch (error) {
    console.error('Failed to get sensor readings:', error)

    return res.status(500).json({
      success: false,
      message: 'Failed to get sensor readings',
    })
  }
}