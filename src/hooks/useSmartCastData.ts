import { useEffect, useState } from 'react'
import { getDeviceStatus } from '../services/smartCastApi'
import type { DeviceStatusResponse } from '../services/smartCastApi'

const DEVICE_ID = 'SC-CAST-001'

export function useSmartCastData() {
  const [data, setData] = useState<DeviceStatusResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadData() {
      try {
        const response = await getDeviceStatus(DEVICE_ID)

        setData(response)
        setError(null)
      } catch (err) {
        console.error('Failed to load SmartCast data:', err)
        setError('Unable to connect to SmartCast backend')
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  return {
    data,
    loading,
    error,
  }
}