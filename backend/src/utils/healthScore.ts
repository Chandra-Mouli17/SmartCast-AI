export interface CastHealthScore {
  score: number
  pressureScore: number
  humidityScore: number
  temperatureScore: number
  movementScore: number
  reasons: string[]
}

function getSensorScore(
  value: number,
  warningThreshold: number,
  criticalThreshold: number,
): number {
  if (value >= criticalThreshold) {
    return 40
  }

  if (value >= warningThreshold) {
    return 70
  }

  return 100
}

export function calculateCastHealthScore(
  pressure: number,
  humidity: number,
  temperature: number,
  movement: number,
): CastHealthScore {
  const pressureScore = getSensorScore(pressure, 85, 95)
  const humidityScore = getSensorScore(humidity, 70, 85)
  const temperatureScore = getSensorScore(temperature, 37.5, 39)
  const movementScore = getSensorScore(movement, 70, 90)

  const reasons: string[] = []

  if (pressureScore < 100) {
    reasons.push('Pressure is above the normal monitoring range.')
  }

  if (humidityScore < 100) {
    reasons.push('Humidity is above the normal monitoring range.')
  }

  if (temperatureScore < 100) {
    reasons.push('Temperature is above the normal monitoring range.')
  }

  if (movementScore < 100) {
    reasons.push('Movement is above the normal monitoring range.')
  }

  if (reasons.length === 0) {
    reasons.push('All monitored sensor readings are within the normal range.')
  }

  const score = Math.round(
    (
      pressureScore +
      humidityScore +
      temperatureScore +
      movementScore
    ) / 4,
  )

  return {
    score,
    pressureScore,
    humidityScore,
    temperatureScore,
    movementScore,
    reasons,
  }
}