import { NextFunction, Request, Response } from 'express'

//if is not sign in  go to next route
export const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
    if (!req.session.userId) {
        console.log('user has no cookie')

        return res.status(400).json({ message: 'User is not logged in' })
    }
    next()
}
