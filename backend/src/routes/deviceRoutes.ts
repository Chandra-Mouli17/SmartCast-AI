import { Router } from 'express'
import { createReading } from '../controllers/readingsController'

const router = Router()

router.post('/:deviceId/readings', createReading)

export default router