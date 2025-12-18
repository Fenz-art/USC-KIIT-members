import express = require('express')
import cors = require('cors')
import path = require('path')
import { env } from './config/env'
import { connectDb } from './config/db'
import membersRouter from './routes/members'
import uploadsRouter from './routes/uploads'

const app = express()

app.use(
  cors({
    origin: env.clientUrl,
  })
)
app.use(express.json())

// Basic health check route
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'USC KIIT Members API running' })
})

app.use('/api/members', membersRouter)
app.use('/api/uploads', uploadsRouter)

// In production, serve Vite-built frontend
if (env.nodeEnv === 'production') {
  const distPath = path.join(__dirname, '..', 'dist')
  app.use(express.static(distPath))

  app.get('*', (_req, res) => {
    res.sendFile(path.join(distPath, 'index.html'))
  })
}

connectDb().then(() => {
  app.listen(env.port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server listening on port ${env.port}`)
  })
})

