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
  if (
    pressure >= 95 ||
    humidity >= 85 ||
    temperature >= 39 ||
    movement >= 90
  ) {
    return {
      level: 'critical',
      title: 'Attention needed',
      message: 'One or more cast readings require attention.',
    }
  }

  if (
    pressure >= 85 ||
    humidity >= 70 ||
    temperature >= 37.5 ||
    movement >= 70
  ) {
    return {
      level: 'warning',
      title: 'Please check your cast',
      message: 'One or more readings are outside the normal monitoring range.',
    }
  }

  return {
    level: 'normal',
    title: 'Everything looks good',
    message: 'Cast readings are currently within the normal monitoring range.',
  }
}