import { SessionOptions } from 'express-session'

const { SESSION_SECRET = 'superscret', SESSION_NAME = 'groupomania.sid' } =
    process.env

export const SESSION_OPTIONS: SessionOptions = {
    secret: SESSION_SECRET,
    name: SESSION_NAME,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 15,
        secure: false,
        httpOnly: true,
        sameSite: 'lax',
    },
}
