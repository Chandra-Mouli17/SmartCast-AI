export function calculateMovementScore(
  motionX: number,
  motionY: number,
  motionZ: number,
): number {
  const magnitude = Math.sqrt(
    motionX ** 2 +
    motionY ** 2 +
    motionZ ** 2,
  )

  const dynamicMovement = Math.abs(magnitude - 1)

  return Math.min(
    100,
    Math.round(dynamicMovement * 100),
  )
}