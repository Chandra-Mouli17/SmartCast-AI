import { Router } from 'express'

const router = Router()

router.get('/', (_req, res) => {
  res.json({
    success: true,
    message: 'SmartCast AI backend is running',
  })
})

export default router