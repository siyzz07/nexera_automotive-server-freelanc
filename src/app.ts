import express from 'express'
import dotenv from 'dotenv'
import authRote from './routes/authRoutes.js'



const app = express()
dotenv.config()



app.use('/api/auth',authRote)


export default app