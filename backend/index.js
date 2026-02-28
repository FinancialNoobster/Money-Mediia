import dotenv from 'dotenv'

dotenv.config()

import express from 'express'
import cors from 'cors'
import authRouter from './routes/auth.js'
import departmentRouter from './routes/department.js'
import employeeRouter from './routes/employee.js'
import connectToDatabase from './db/db.js'
import salaryRouter from './routes/salary.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('public/uploads'))
app.use('/api/auth', authRouter)
app.use('/api/departments', departmentRouter)
app.use('/api/employee', employeeRouter)
app.use('/api/salary', salaryRouter)

const PORT = process.env.PORT || 5000

connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
    process.exit(1); // stop server if DB fails
  });

