import express from 'express'
import cors from 'cors'
import session from 'express-session'
import Redis from 'ioredis'
import connectRedis from 'connect-redis'

import {
    authRoutes,
    commentRoutes,
    likeRoutes,
    postRoutes,
    uploadRoutes,
    userRoutes,
} from './routes'
import { SERVER_OPTIONS } from './config/server'
import { REDIS_OPTIONS } from './config/cache'
import { SESSION_OPTIONS } from './config/session'

const app = express()

//session store
const RedisStore = connectRedis(session)
export const redisClient = new Redis(REDIS_OPTIONS)

//
//middlewares
//
app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true,
    })
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(
    session({
        ...SESSION_OPTIONS,
        store: new RedisStore({ client: redisClient }),
    })
)

//
//routes
//
app.use('/api/auth/', authRoutes)
app.use('/api/users/', userRoutes)
app.use('/api/posts/', postRoutes)
app.use('/api/upload/', uploadRoutes)
app.use('/api/comment/', commentRoutes)
app.use('/api/hascookie/', userRoutes)
app.use('/api/like', likeRoutes)

app.listen(SERVER_OPTIONS, () => {
    console.log(`Server Running `)
})
