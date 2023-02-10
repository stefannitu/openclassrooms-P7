import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { callbackify } from 'util'

const prisma = new PrismaClient()

export const savePost = async (req: Request, res: Response) => {
    const { description } = req.body

    let image = ''
    if (!description) {
        return res.status(400).json('No post description')
    }

    if (req.file !== undefined) {
        image = req.file!.filename
    }

    try {
        await prisma.posts.create({
            data: {
                description,
                image: image,
                ownerId: req.session.userId!,
            },
        })
        res.status(203).json({ message: 'Post has been created' })
    } catch (error) {
        res.status(500).json({
            message: 'There was an error saving message',
        })
    }
}

export const getPost = async (req: Request, res: Response) => {
    try {
        const posts = await prisma.posts.findMany({
            where: {
                deleted: false,
            },
            include: {
                author: true,
                reads: true,
                _count: {
                    select: {
                        comment: true,
                        likes: true,
                    },
                },

                likes: {
                    where: {
                        ownerId: req.session.userId,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        })
        res.status(200).json(posts)
    } catch (error) {
        res.status(500)
        console.log(error)
    }
}

export const deletePost = async (req: Request, res: Response) => {
    const ownerId = req.session.userId
    const postId = req.params.postId
    const todayDate = new Date()
    try {
        const result: number =
            await prisma.$executeRaw`UPDATE posts set "deleted"=true,"deletedAt"= ${todayDate} WHERE "id"=${+postId} AND "ownerId"=${ownerId};`
        return res.status(200).json({ message: result })
    } catch (error) {
        console.log(deletePost)
        res.status(400).json({ message: 'Deleting failled' })
    }
}

export const readPost = async (req: Request, res: Response) => {
    const { postId } = req.body
    try {
        const response = await prisma.reads.create({
            data: {
                ownerId: req.session.userId!,
                postId,
            },
        })
        res.status(203).json({ message: 'Post has been read' })
    } catch (error) {
        res.status(500).json({
            message: 'There was an error',
        })
        console.log(error)
    }
}

export const getUserPosts = async (req: Request, res: Response) => {
    const userId = req.params.userId
    try {
        const posts = await prisma.posts.findMany({
            where: {
                deleted: false,
                ownerId: userId,
                /*    reads: {
                    none: {},
                }, */
            },
            include: {
                author: true,
                reads: true,
                _count: {
                    select: {
                        comment: true,
                        likes: true,
                    },
                },

                likes: {
                    where: {
                        ownerId: req.session.userId,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        })
        res.status(200).json(posts)
    } catch (error) {
        res.status(500)

        console.log(error)
    }
}
