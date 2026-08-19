import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import healthRoutes from './routes/healthRoutes'
import deviceRoutes from './routes/deviceRoutes'
import simulatorRoutes from './routes/simulatorRoutes'

dotenv.config()

const app = express()

const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.use('/api/health', healthRoutes)
app.use('/api/devices', deviceRoutes)
app.use('/api/simulator', simulatorRoutes)
app.listen(Number(PORT), '0.0.0.0', () => {
  console.log(`SmartCast AI backend running on port ${PORT}`)
})