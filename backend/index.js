import express from 'express'
import cors from 'cors'
import authRouter from './routes/auth.js'
import departmentRouter from './routes/department.js'
import employeeRouter from './routes/employee.js'
import connectToDatabase from './db/db.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/auth', authRouter)
app.use('/api/departments', departmentRouter)
app.use('/api/employee', employeeRouter)

const PORT = process.env.PORT || 5000

connectToDatabase().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is Running on port ${PORT}`)
    })
})
