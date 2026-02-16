import express from 'express'
import cors from 'cors'
import authRouter from './routes/auth.js'

const app = express()

const corsOptions = {
  origin: true,
  credentials: true,
}

app.use(cors(corsOptions))
app.options(/.*/, cors(corsOptions))
app.use(express.json())
app.use('/api/auth', authRouter)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server is Running on port ${PORT}`)
})
