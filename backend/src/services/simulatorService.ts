import { saveSensorReading } from './readingsService'
const DEVICE_ID = 'SC-CAST-001'

let running = false
let starting = false

let interval: NodeJS.Timeout | null = null
let startTimer: NodeJS.Timeout | null = null

function randomBetween(
  min: number,
  max: number,
  decimals = 1,
) {
  const value = Math.random() * (max - min) + min
  return Number(value.toFixed(decimals))
}

async function generateReading() {
  const reading = {
    deviceId: DEVICE_ID,

    pressure: randomBetween(30, 40),
    humidity: randomBetween(59, 68),
    temperature: randomBetween(35, 36.5),

    motionX: 0.12,
    motionY: 0.04,
    motionZ: 0.98,
  }

  try {
    await saveSensorReading(reading)

    console.log(
      `Simulator → Pressure ${reading.pressure}% | ` +
      `Humidity ${reading.humidity}% | ` +
      `Temperature ${reading.temperature}°C`,
    )
  } catch (error) {
    console.error('Simulator failed:', error)
  }
}

export function startSimulator() {
  if (running || starting) {
    return
  }

  starting = true

  startTimer = setTimeout(() => {
    starting = false
    running = true

    generateReading()

    interval = setInterval(
      generateReading,
      5000,
    )
  }, 3000)
}

export function stopSimulator() {
  if (startTimer) {
    clearTimeout(startTimer)
    startTimer = null
  }

  if (interval) {
    clearInterval(interval)
    interval = null
  }

  starting = false
  running = false
}

export function getSimulatorState() {
  return {
    running,
    starting,
  }
}