import { Request, Response } from 'express'
import { prisma } from '../config/prisma'

export const addComment = async (req: Request, res: Response) => {
    const { description, postId } = req.body

    if (!description || !postId || !req.session.userId) {
        return res.status(400).json('No post description or cookie')
    }

    try {
        await prisma.comments.create({
            data: {
                description,
                ownerId: req.session.userId,
                postId,
            },
        })
        res.status(203).json({ message: 'Comment saved' })
    } catch (error) {
        res.status(500).json({ message: 'could not save comment' })
    }
}

export const getComment = async (req: Request, res: Response) => {
    const postId = req.params.postId
    const comments = await prisma.comments.findMany({
        where: {
            postId: +postId,
        },
        include: {
            author: true,
        },
    })
    res.status(200).json({ comments })
}
