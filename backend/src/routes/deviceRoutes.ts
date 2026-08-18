import { Router } from 'express'
import {
  createReading,
  getLatestReading,
  getReadingHistory,
} from '../controllers/readingsController'

const router = Router()

router.post('/:deviceId/readings', createReading)
router.get('/:deviceId/readings', getReadingHistory)
router.get('/:deviceId/latest', getLatestReading)

export default router