export type StatusLevel = 'normal' | 'warning' | 'critical'

export interface CastStatus {
  level: StatusLevel
  title: string
  message: string
}

export function getCastStatus(
  pressure: number,
  humidity: number,
  temperature: number,
  movement: number,
): CastStatus {
  // Critical conditions
  if (
    pressure >= 95 ||
    humidity >= 85 ||
    temperature >= 39 ||
    movement >= 90
  ) {
    return {
      level: 'critical',
      title: 'Attention needed',
      message: 'Your cast needs attention.',
    }
  }

  // Warning conditions
  if (
    pressure >= 85 ||
    humidity >= 70 ||
    temperature >= 37.5 ||
    movement >= 70
  ) {
    return {
      level: 'warning',
      title: 'Please check your cast',
      message: 'Some readings need your attention.',
    }
  }

  // Normal
  return {
    level: 'normal',
    title: 'Everything looks good',
    message: 'Your cast is being monitored normally.',
  }
}
export function getSensorLevel(
  value: number,
  warningThreshold: number,
  criticalThreshold: number,
): StatusLevel {
  if (value >= criticalThreshold) {
    return 'critical'
  }

  if (value >= warningThreshold) {
    return 'warning'
  }

  return 'normal'
}