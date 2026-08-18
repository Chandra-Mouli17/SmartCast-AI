import { TrendResult } from './trends'

export interface MultiSensorAnomaly {
  detected: boolean
  severity: 'normal' | 'warning' | 'critical'
  sensors: string[]
  explanation: string
}

export function detectMultiSensorAnomaly(
  pressure: TrendResult,
  humidity: TrendResult,
  temperature: TrendResult,
  movement: TrendResult,
): MultiSensorAnomaly {
  const risingSensors: string[] = []

  if (pressure.direction === 'rising') {
    risingSensors.push('pressure')
  }

  if (humidity.direction === 'rising') {
    risingSensors.push('humidity')
  }

  if (temperature.direction === 'rising') {
    risingSensors.push('temperature')
  }

  if (movement.direction === 'rising') {
    risingSensors.push('movement')
  }

  if (risingSensors.length >= 4) {
    return {
      detected: true,
      severity: 'critical',
      sensors: risingSensors,
      explanation:
        'Multiple sensor readings are rising together and require attention.',
    }
  }

  if (risingSensors.length >= 2) {
    return {
      detected: true,
      severity: 'warning',
      sensors: risingSensors,
      explanation:
        'Multiple sensor readings are showing a rising pattern.',
    }
  }

  return {
    detected: false,
    severity: 'normal',
    sensors: risingSensors,
    explanation: 'No significant multi-sensor pattern detected.',
  }
}