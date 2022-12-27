import { NextFunction, Request, Response } from 'express'

export const authenticated = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (req.session.userId) {
        console.log(req.sessionID)
        return res.status(401).json({ message: 'User is already signed in' })
    }
    next()
}
