import { Request, Response } from 'express'

//if is not sign in  go to next route
export const testUser = (req: Request, res: Response) => {
    if (req.session.userId) {
        return res.status(200).json({ message: 'User is already logged in' })
    }
    res.status(200).json({ message: 'User not logged in' })
}
