import express from 'express'
import databaseConnection from './database/connection.js'
import userRoutes from './routes/routes.js'
import dotenv from 'dotenv'
dotenv.config()

const app = express()

// routes

app.use(express.json())
app.use('/', userRoutes)
// database connnection
const DATABASE_URL = process.env.DATABASE_URL
databaseConnection(DATABASE_URL)

app.listen(5000, () => {
    console.log("App is running")
})