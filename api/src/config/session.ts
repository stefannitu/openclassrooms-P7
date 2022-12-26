import { SessionOptions } from 'express-session'

const {
  SESSION_SECRET = 'superscret',
  SESSION_NAME = 'groupomania.sid',
  NODE_ENV = 'development',
} = process.env

export const SESSION_OPTIONS: SessionOptions = {
  secret: SESSION_SECRET,
  name: SESSION_NAME,
  cookie: {
    //1 minute for testing purpose
    maxAge: 1000 * 60 * 30,
    secure: false,
    httpOnly: NODE_ENV == 'production',
  },
  rolling: false,
  resave: false,
  saveUninitialized: false,
}
