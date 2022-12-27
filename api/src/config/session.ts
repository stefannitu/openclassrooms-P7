import { SessionOptions } from 'express-session'

const { SESSION_SECRET = 'superscret', SESSION_NAME = 'groupomania.sid' } =
    process.env

export const SESSION_OPTIONS: SessionOptions = {
    secret: SESSION_SECRET,
    name: SESSION_NAME,
    resave: false,
    saveUninitialized: false,
    cookie: {
        //1 minute for testing purpose
        maxAge: 1000 * 60 * 3,
        secure: false,
        httpOnly: true,
        sameSite: 'lax',
    },
}
