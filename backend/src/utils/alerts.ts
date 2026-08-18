import { StatusLevel } from './status'

export interface SensorAlert {
  type: 'pressure' | 'humidity' | 'temperature' | 'movement'
  severity: StatusLevel
  title: string
  message: string
  value: number
}

export function generateSensorAlerts(
  pressure: number,
  humidity: number,
  temperature: number,
  movement: number,
): SensorAlert[] {
  const alerts: SensorAlert[] = []

  if (pressure >= 95) {
    alerts.push({
      type: 'pressure',
      severity: 'critical',
      title: 'High pressure detected',
      message: 'Cast pressure is above the critical monitoring threshold.',
      value: pressure,
    })
  } else if (pressure >= 85) {
    alerts.push({
      type: 'pressure',
      severity: 'warning',
      title: 'Pressure elevated',
      message: 'Cast pressure is above the normal monitoring range.',
      value: pressure,
    })
  }

  if (humidity >= 85) {
    alerts.push({
      type: 'humidity',
      severity: 'critical',
      title: 'High humidity detected',
      message: 'Humidity inside the cast is above the critical monitoring threshold.',
      value: humidity,
    })
  } else if (humidity >= 70) {
    alerts.push({
      type: 'humidity',
      severity: 'warning',
      title: 'Humidity elevated',
      message: 'Humidity inside the cast is above the normal monitoring range.',
      value: humidity,
    })
  }

  if (temperature >= 39) {
    alerts.push({
      type: 'temperature',
      severity: 'critical',
      title: 'High temperature detected',
      message: 'Temperature is above the critical monitoring threshold.',
      value: temperature,
    })
  } else if (temperature >= 37.5) {
    alerts.push({
      type: 'temperature',
      severity: 'warning',
      title: 'Temperature elevated',
      message: 'Temperature is above the normal monitoring range.',
      value: temperature,
    })
  }

  if (movement >= 90) {
    alerts.push({
      type: 'movement',
      severity: 'critical',
      title: 'High movement detected',
      message: 'Cast movement is above the critical monitoring threshold.',
      value: movement,
    })
  } else if (movement >= 70) {
    alerts.push({
      type: 'movement',
      severity: 'warning',
      title: 'Movement elevated',
      message: 'Cast movement is above the normal monitoring range.',
      value: movement,
    })
  }

  return alerts
}