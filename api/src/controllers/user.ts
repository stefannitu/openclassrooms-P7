import { Request, Response } from 'express'
import { prisma } from '../config/prisma'

//if is not sign in  go to next route

export const hasCookie = (req: Request, res: Response) => {
    if (req.session.userId) {
        const user = {
            id: req.session.userId,
            email: req.session.email,
            firstName: req.session.firstName,
            lastName: req.session.lastName,
            avatar: req.session.avatar,
        }

        return res.status(200).json({ user })
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

export const deleteUser = async (req: Request, res: Response) => {
    const ownerId = req.session.userId
    const todayDate = new Date()
    try {
        const result =
            // await prisma.$executeRaw`UPDATE users set "deleted"=true,"deletedAt"= ${todayDate}, WHERE "id"=${ownerId};`
            await prisma.users.update({
                where: {
                    id: ownerId,
                },
                data: {
                    deleted: true,
                    deletedAt: todayDate,
                    firstName: '(deleted)' + req.session.firstName,
                },
            })

        req.session.destroy(function (err) {
            if (err) {
                return res.status(400).json({ message: 'Delete Error' })
            }
            return res.clearCookie('groupomania.sid').send()
        })

        // return res.status(200).json({ message: result })
    } catch (error) {
        console.log(deleteUser)
        res.status(400).json({ message: 'Deleting failled' })
    }
}
