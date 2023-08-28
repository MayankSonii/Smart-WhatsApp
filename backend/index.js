import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import chatRoute from './routes/chatRoute.js'

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())

//sending the requests for /v1/chat to chatRoute
app.use('/v1/chat', chatRoute)

const PORT = process.env.PORT

app.listen(PORT, () =>
    console.log(`listening....\nVisit: https://localhost:${PORT}`)
)
