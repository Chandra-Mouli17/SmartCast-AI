import { useEffect, useState } from 'react'
import { getDeviceHealth } from '../services/smartCastApi'
import type { DeviceHealthResponse } from '../services/smartCastApi'

const DEVICE_ID = 'SC-CAST-001'

export function useSmartCastHealth() {
  const [data, setData] = useState<DeviceHealthResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadHealth() {
      try {
        const response = await getDeviceHealth(DEVICE_ID)

        setData(response)
        setError(null)
      } catch (err) {
        console.error('Failed to load SmartCast health score:', err)
        setError('Unable to load SmartCast health score')
      } finally {
        setLoading(false)
      }
    }

    loadHealth()
  }, [])

  return {
    data,
    loading,
    error,
  }
}