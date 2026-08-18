import { Router } from 'express'
import {
  createReading,
  getLatestReading,
  getReadingHistory,
} from '../controllers/readingsController'
import { getDeviceStatus } from '../controllers/statusController'
import { getDeviceAlerts } from '../controllers/alertsController'
import { getDeviceTrends } from '../controllers/trendsController'

const router = Router()

router.post('/:deviceId/readings', createReading)
router.get('/:deviceId/readings', getReadingHistory)
router.get('/:deviceId/latest', getLatestReading)
router.get('/:deviceId/status', getDeviceStatus)
router.get('/:deviceId/alerts', getDeviceAlerts)
router.get('/:deviceId/trends', getDeviceTrends)

export default router