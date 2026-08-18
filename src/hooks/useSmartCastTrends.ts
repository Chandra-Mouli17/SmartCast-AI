import { useEffect, useState } from 'react'
import { getDeviceTrends } from '../services/smartCastApi'
import type { DeviceTrendsResponse } from '../services/smartCastApi'

const DEVICE_ID = 'SC-CAST-001'

export function useSmartCastTrends() {
  const [data, setData] = useState<DeviceTrendsResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadTrends() {
      try {
        const response = await getDeviceTrends(DEVICE_ID)

        setData(response)
        setError(null)
      } catch (err) {
        console.error('Failed to load SmartCast trends:', err)
        setError('Unable to load SmartCast trends')
      } finally {
        setLoading(false)
      }
    }

    loadTrends()
  }, [])

  return {
    data,
    loading,
    error,
  }
}