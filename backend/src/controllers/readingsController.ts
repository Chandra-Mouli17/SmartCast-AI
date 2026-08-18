import { Request, Response } from 'express'
import {
  SensorReading,
  SensorReadingInput,
} from '../utils/sensorTypes'

export function createReading(req: Request, res: Response) {
const deviceId = req.params.deviceId

if (typeof deviceId !== 'string' || !deviceId.trim()) {
  return res.status(400).json({
    success: false,
    message: 'Invalid device ID',
  })
}  const body = req.body as SensorReadingInput

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

  return res.status(201).json({
    success: true,
    message: 'Sensor reading received',
    data: reading,
  })
}