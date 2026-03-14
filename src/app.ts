import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRoute from './routes/authRoutes.js'
import categoryRoute from './routes/categoryRoutes.js'
import { errorHandler } from './middleware/errorHandling.js'

const app = express()

app.use(
  cors({
    origin: "http://localhost:5174",
    credentials: true
  })
);
app.use(cookieParser())
app.use(express.json())

app.use('/api/auth', authRoute)
app.use('/api/category', categoryRoute)

app.use(errorHandler)

export default app