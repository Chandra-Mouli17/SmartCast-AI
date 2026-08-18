import { Router } from 'express'
import {
  createReading,
  getLatestReading,
  getReadingHistory,
} from '../controllers/readingsController'
import { getDeviceStatus } from '../controllers/statusController'

const router = Router()

router.post('/:deviceId/readings', createReading)
router.get('/:deviceId/readings', getReadingHistory)
router.get('/:deviceId/latest', getLatestReading)
router.get('/:deviceId/status', getDeviceStatus)
export default router