import { useEffect, useState } from 'react'
import { getDeviceStatus } from '../services/smartCastApi'
import type { DeviceStatusResponse } from '../services/smartCastApi'

const DEVICE_ID = 'SC-CAST-001'
const REFRESH_INTERVAL = 5000

export function useSmartCastData() {
  const [data, setData] = useState<DeviceStatusResponse | null>(null)
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

    loadData()

    const interval = setInterval(
      loadData,
      REFRESH_INTERVAL,
    )

    return () => {
      active = false
      clearInterval(interval)
    }
  }, [])

  return {
    data,
    loading,
    error,
  }
}