import { Router } from 'express'
import {
  getSimulatorStatus,
  toggleSimulator,
} from '../controllers/simulatorController'

const router = Router()

router.post('/toggle', toggleSimulator)
router.get('/status', getSimulatorStatus)

export default router