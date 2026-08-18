import { useEffect, useState } from 'react'
import { getDeviceReadings } from '../services/smartCastApi'
import type { DeviceReadingsResponse } from '../services/smartCastApi'

const DEVICE_ID = 'SC-CAST-001'

export function useSmartCastHistory() {
  const [data, setData] = useState<DeviceReadingsResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadHistory() {
      try {
        const response = await getDeviceReadings(DEVICE_ID)

        setData(response)
        setError(null)
      } catch (err) {
        console.error('Failed to load SmartCast history:', err)
        setError('Unable to load SmartCast history')
      } finally {
        setLoading(false)
      }
    }

    loadHistory()
  }, [])

  return {
    data,
    loading,
    error,
  }
}