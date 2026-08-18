import { Request, Response } from 'express'
import { getLatestSensorReading } from '../services/readingsService'
import { calculateMovementScore } from '../utils/movement'
import { generateSensorAlerts } from '../utils/alerts'

export async function getDeviceAlerts(req: Request, res: Response) {
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

    const movement = calculateMovementScore(
      reading.motion_x,
      reading.motion_y,
      reading.motion_z,
    )

    const alerts = generateSensorAlerts(
      reading.pressure,
      reading.humidity,
      reading.temperature,
      movement,
    )

    return res.json({
      success: true,
      deviceId,
      alertCount: alerts.length,
      alerts,
      createdAt: reading.created_at,
    })
  } catch (error) {
    console.error('Failed to generate device alerts:', error)

    return res.status(500).json({
      success: false,
      message: 'Failed to generate device alerts',
    })
  }
}