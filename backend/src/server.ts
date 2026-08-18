import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.json({
    success: true,
    message: 'SmartCast AI backend is running',
  })
})

app.listen(PORT, () => {
  console.log(`SmartCast AI backend running on port ${PORT}`)
})