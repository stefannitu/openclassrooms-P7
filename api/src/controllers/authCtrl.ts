import { Request, Response } from 'express'

declare module 'express-session' {
  interface SessionData {
    userId: string
  }
}
export const register = (req: Request, res: Response) => {
  req.session.userId = 'test'
  res.json({ msg: 'cookie saved' })
}
