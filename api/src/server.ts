import express from 'express'
import cors from 'cors'
import session from 'express-session'
import Redis from 'ioredis'
import connectRedis from 'connect-redis'
import { upload } from './middleware/uploadFile'

import { AuthRoute, MessagesRoute, TestUserRoute } from './routes'
import { SERVER_OPTIONS } from './config/server'
import { REDIS_OPTIONS } from './config/cache'
import { SESSION_OPTIONS } from './config/session'

const app = express()

//session store
const RedisStore = connectRedis(session)
export const redisClient = new Redis(REDIS_OPTIONS)

//middlewares
app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true,
    })
)
app.use(express.json())

app.use(express.urlencoded({ extended: true }))

//when in prodution behind a proxy
//if cookie {secure:true}
//the line below has to be uncommented
//      app.set('trust proxy', 1)

// for setting var in cookie
app.use(
    session({
        ...SESSION_OPTIONS,
        store: new RedisStore({ client: redisClient }),
    })
)
//routes
app.post('/photo', upload.single('userAvatar'), (req, res) => {
    res.json({ message: req.file })
})
app.use(AuthRoute)
app.use(MessagesRoute)
app.use(TestUserRoute)
//IIFE
;(async () => {
    try {
        //start server
        app.listen(SERVER_OPTIONS, () => {
            console.log(`Server Running `)
        })
    } catch (e) {
        console.log(e)
    }
})()
