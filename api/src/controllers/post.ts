import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'

const prisma = new PrismaClient()

export const savePost = async (req: Request, res: Response) => {
    const { description } = req.body
    let image = ''
    if (!description || !req.session.userId) {
        return res.status(400).json('No post description or cookie')
    }
    if (req.file !== undefined) {
        image = req.file!.filename
    }

    try {
        await prisma.posts.create({
            data: {
                description,
                image: image,
                ownerId: req.session.userId,
            },
        })
        res.status(203).json({ message: 'Post has been created' })
    } catch (error) {
        console.log(error)

        res.status(500).json({
            message: 'There was an error saving message',
        })
    }
}

export const getPost = async (req: Request, res: Response) => {
    try {
        const posts = await prisma.posts.findMany({
            include: { author: true, comment: true },
        })
        res.status(200).json(posts)
    } catch (error) {
        res.status(500)
        console.log(error)
    }
}

export const deletePost = (req: Request, res: Response) => {}
