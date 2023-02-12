import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

//if is not sign in  go to next route

export const hasCookie = (req: Request, res: Response) => {
    if (req.session.userId) {
        const user = {
            userId: req.session.userId,
            userEmail: req.session.email,
            userFirstName: req.session.firstName,
            userLastName: req.session.lastName,
            userAvatar: req.session.avatar,
        }

        return res.status(200).json({ user })
        // return res.status(200).json({ message: 'User already logged in' })
    }
    return res.status(401).json({ message: 'Authorization required' })
}

export const getUser = async (req: Request, res: Response) => {
    const userId = req.params.userId
    try {
        const user = await prisma.users.findUnique({
            where: {
                id: userId,
            },
        })
        res.status(200).json({ user })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'User has not been found' })
    }
}
