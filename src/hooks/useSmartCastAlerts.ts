import { useEffect, useState } from 'react'
import { getDeviceAlerts } from '../services/smartCastApi'
import type { DeviceAlertsResponse } from '../services/smartCastApi'

const DEVICE_ID = 'SC-CAST-001'

export function useSmartCastAlerts() {
  const [data, setData] = useState<DeviceAlertsResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadAlerts() {
      try {
        const response = await getDeviceAlerts(DEVICE_ID)

        setData(response)
        setError(null)
      } catch (err) {
        console.error('Failed to load SmartCast alerts:', err)
        setError('Unable to load SmartCast alerts')
      } finally {
        setLoading(false)
      }
    }

    loadAlerts()
  }, [])

  return {
    data,
    loading,
    error,
  }
}