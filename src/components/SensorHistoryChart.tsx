import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { LatestSensorReading } from '../services/smartCastApi'

interface SensorHistoryChartProps {
  readings: LatestSensorReading[]
}

function SensorHistoryChart({
  readings,
}: SensorHistoryChartProps) {
  const chartData = [...readings]
    .reverse()
    .map((reading) => ({
      time: new Date(reading.created_at).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      pressure: reading.pressure,
      humidity: reading.humidity,
      temperature: reading.temperature,
    }))

  return (
    <div style={{ width: '100%', height: 280 }}>
      <ResponsiveContainer>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="time" />

          <YAxis />

          <Tooltip />

          <Legend />

          <Line
            type="monotone"
            dataKey="pressure"
            name="Pressure"
            stroke="currentColor"
          />

          <Line
            type="monotone"
            dataKey="humidity"
            name="Humidity"
            stroke="currentColor"
          />

          <Line
            type="monotone"
            dataKey="temperature"
            name="Temperature"
            stroke="currentColor"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default SensorHistoryChart