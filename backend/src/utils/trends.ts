export type TrendDirection = 'rising' | 'falling' | 'stable'

export interface TrendResult {
  direction: TrendDirection
  change: number
}

export function calculateTrend(
  values: number[],
  minimumChange: number,
): TrendResult {
  if (values.length < 2) {
    return {
      direction: 'stable',
      change: 0,
    }
  }

  const firstValue = values[0]
  const lastValue = values[values.length - 1]

  const change = Number((lastValue - firstValue).toFixed(2))

  if (change >= minimumChange) {
    return {
      direction: 'rising',
      change,
    }
  }

  if (change <= -minimumChange) {
    return {
      direction: 'falling',
      change,
    }
  }

  return {
    direction: 'stable',
    change,
  }
}