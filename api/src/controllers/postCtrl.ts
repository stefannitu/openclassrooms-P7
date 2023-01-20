import { Request, Response } from 'express'
import { Prisma, PrismaClient } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'

const prisma = new PrismaClient()

export const savePost = async (req: Request, res: Response) => {
    const { postTitle, postMessage } = req.body
    if (!postTitle || !postMessage || !req.session.userId) {
        return res.status(400).json('Empty fields')
    }
    try {
        await prisma.message.create({
            data: {
                postTitle,
                postMessage,
                ownerId: req.session.userId,
            },
        })
        res.status(203).json({ message: 'Post has been created' })
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code == 'P2002') {
                return res
                    .status(400)
                    .json({ message: 'There already a post with this title' })
            }
        }
        res.status(400).json({
            message: 'There was an error saving message',
        })
    }
}

export const listPost = async (req: Request, res: Response) => {
    try {
        const posts = await prisma.message.findMany({
            include: { author: true },
        })
        res.status(200).json(posts)
    } catch (error) {
        res.status(500)
        console.log(error)
    }
}
