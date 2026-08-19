import { Request, Response } from 'express'
import {
  getSimulatorState,
  startSimulator,
  stopSimulator,
} from '../services/simulatorService'

export function toggleSimulator(_req: Request, res: Response) {
  const currentState = getSimulatorState()

  if (currentState.running || currentState.starting) {
    stopSimulator()

    return res.json({
      success: true,
      state: 'off',
      running: false,
      starting: false,
    })
  }

  startSimulator()

  return res.json({
    success: true,
    state: 'starting',
    running: false,
    starting: true,
  })
}

export function getSimulatorStatus(_req: Request, res: Response) {
  const state = getSimulatorState()

  return res.json({
    success: true,
    state: state.starting
      ? 'starting'
      : state.running
        ? 'running'
        : 'off',
    ...state,
  })
}