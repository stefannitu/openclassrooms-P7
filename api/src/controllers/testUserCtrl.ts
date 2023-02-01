import { Request, Response } from 'express'

//if is not sign in  go to next route
export const userHasCookie = (req: Request, res: Response) => {
    if (req.session.userId) {
        return res.status(200).json({ message: 'User already logged in' })
    }
    return res.status(401).json({ message: 'Authorization required' })
}
