import { useEffect, useState } from 'react'
import {
  getSimulatorStatus,
  toggleSimulator,
} from '../services/smartCastApi'
import type { SimulatorStatusResponse } from '../services/smartCastApi'

export function useSimulatorControl() {
  const [status, setStatus] = useState<SimulatorStatusResponse | null>(null)

  useEffect(() => {
    let active = true

    async function loadStatus() {
      try {
        const response = await getSimulatorStatus()

        if (active) {
          setStatus(response)
        }
      } catch (error) {
        console.error('Failed to load simulator status:', error)
      }
    }

    async function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== 'Enter' || event.repeat) {
        return
      }

      // Avoid triggering while typing inside inputs/buttons
      const target = event.target as HTMLElement

      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'BUTTON'
      ) {
        return
      }

      try {
        const response = await toggleSimulator()
        setStatus(response)
      } catch (error) {
        console.error('Failed to toggle simulator:', error)
      }
    }

    loadStatus()

    const interval = setInterval(loadStatus, 1000)

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      active = false
      clearInterval(interval)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return status
}