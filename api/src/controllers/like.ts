import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
const prisma = new PrismaClient()

export const saveLike = async (req: Request, res: Response) => {
    const { postId, likes } = req.body
    //	check if user already liked the post

    if (likes.length) {
        try {
            await prisma.likes.deleteMany({
                where: {
                    ownerId: req.session.userId,
                    postId,
                },
            })
            return res.status(200).json({ message: 'Like removed' })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: 'Like couldnt be removed ' })
        }
    }
    try {
        await prisma.likes.create({
            data: {
                ownerId: req.session.userId!,
                postId,
            },
        })
        res.status(203).json({ message: 'Like has been added' })
    } catch (error) {
        res.status(500).json({
            message: 'There was an error saving like',
        })
        console.log(error)
    }
}
