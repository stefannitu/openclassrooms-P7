import { NextFunction, Request, Response } from 'express'

//if is not sign in  go to next route
export const isGuest = (req: Request, res: Response, next: NextFunction) => {
    if (req.session.userId) {
        return res.status(400).json({ message: 'User is already logged in' })
    }
    next()
}
