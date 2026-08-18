import { Router } from 'express'
import {
  createReading,
  getLatestReading,
} from '../controllers/readingsController'

const router = Router()

router.post('/:deviceId/readings', createReading)
router.get('/:deviceId/latest', getLatestReading)

export default router