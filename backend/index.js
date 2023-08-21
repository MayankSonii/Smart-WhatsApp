import express from 'express'
import dotenv from 'dotenv'
import chatRoute from './routes/chatRoute.js'

dotenv.config()
const app = express()

app.use(express.json())

app.use('/v1/chat', chatRoute)

const PORT = process.env.PORT

app.listen(PORT, () =>
    console.log(`listening....\nVisit: https://localhost:${PORT}`)
)
