import { Request, Response } from 'express'
import { getRecentReadingsForTrend } from '../services/readingsService'
import { calculateTrend } from '../utils/trends'
import { calculateMovementScore } from '../utils/movement'
import { detectMultiSensorAnomaly } from '../utils/anomaly'

export async function getDeviceTrends(req: Request, res: Response) {
  const deviceId = req.params.deviceId

  if (typeof deviceId !== 'string' || !deviceId.trim()) {
    return res.status(400).json({
      success: false,
      message: 'Invalid device ID',
    })
  }

  try {
    const readings = await getRecentReadingsForTrend(deviceId, 6)

    if (readings.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No sensor readings found',
      })
    }

    const pressureValues = readings.map((reading) => reading.pressure)
    const humidityValues = readings.map((reading) => reading.humidity)
    const temperatureValues = readings.map((reading) => reading.temperature)

    const movementValues = readings.map((reading) =>
      calculateMovementScore(
        reading.motion_x,
        reading.motion_y,
        reading.motion_z,
      ),
    )

   const trends = {
  pressure: calculateTrend(pressureValues, 5),
  humidity: calculateTrend(humidityValues, 5),
  temperature: calculateTrend(temperatureValues, 0.5),
  movement: calculateTrend(movementValues, 10),
}

const anomaly = detectMultiSensorAnomaly(
  trends.pressure,
  trends.humidity,
  trends.temperature,
  trends.movement,
)

return res.json({
  success: true,
  deviceId,
  readingsAnalyzed: readings.length,
  trends,
  anomaly,
})
    return res.json({
      success: true,
      deviceId,
      readingsAnalyzed: readings.length,
      trends,
    })
  } catch (error) {
    console.error('Failed to calculate sensor trends:', error)

    return res.status(500).json({
      success: false,
      message: 'Failed to calculate sensor trends',
    })
  }
}