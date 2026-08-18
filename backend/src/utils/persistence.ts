export interface PersistenceResult {
  persistent: boolean
  consecutiveReadings: number
  requiredReadings: number
}

export function detectPersistentHighReading(
  values: number[],
  threshold: number,
  requiredReadings = 3,
): PersistenceResult {
  let consecutiveReadings = 0

  for (let i = values.length - 1; i >= 0; i--) {
    if (values[i] >= threshold) {
      consecutiveReadings++
    } else {
      break
    }
  }

  return {
    persistent: consecutiveReadings >= requiredReadings,
    consecutiveReadings,
    requiredReadings,
  }
}