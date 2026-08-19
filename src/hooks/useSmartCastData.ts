import { useEffect, useState } from 'react'
import {
  getDeviceStatus,
  getSimulatorStatus,
} from '../services/smartCastApi'
import type {
  DeviceStatusResponse,
  SimulatorStatusResponse,
} from '../services/smartCastApi'

const DEVICE_ID = 'SC-CAST-001'
const DATA_REFRESH_INTERVAL = 5000
const SIMULATOR_REFRESH_INTERVAL = 1000

export function useSmartCastData() {
  const [data, setData] =
    useState<DeviceStatusResponse | null>(null)

  const [simulatorStatus, setSimulatorStatus] =
    useState<SimulatorStatusResponse | null>(null)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true

    async function loadData() {
      try {
        const response = await getDeviceStatus(DEVICE_ID)

        if (active) {
          setData(response)
          setError(null)
        }
      } catch (err) {
        console.error('Failed to load SmartCast data:', err)

        if (active) {
          setError('Unable to connect to SmartCast backend')
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    async function loadSimulatorStatus() {
      try {
        const response = await getSimulatorStatus()

        if (active) {
          setSimulatorStatus(response)
        }
      } catch (err) {
        console.error('Failed to load simulator status:', err)
      }
    }

    loadData()
    loadSimulatorStatus()

    const dataInterval = setInterval(
      loadData,
      DATA_REFRESH_INTERVAL,
    )

    const simulatorInterval = setInterval(
      loadSimulatorStatus,
      SIMULATOR_REFRESH_INTERVAL,
    )

    return () => {
      active = false
      clearInterval(dataInterval)
      clearInterval(simulatorInterval)
    }
  }, [])

  return {
    data,
    loading,
    error,
    simulatorStatus,
    simulatorRunning:
      simulatorStatus?.state === 'running',
    simulatorStarting:
      simulatorStatus?.state === 'starting',
  }
}