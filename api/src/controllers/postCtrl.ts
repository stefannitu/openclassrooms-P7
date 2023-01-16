import { Request, Response } from 'express'
import { Prisma, PrismaClient } from '@prisma/client'
import {
    PrismaClientKnownRequestError,
    PrismaClientUnknownRequestError,
    PrismaClientValidationError,
} from '@prisma/client/runtime'

const prisma = new PrismaClient()

export const savePost = async (req: Request, res: Response) => {
    const { postTitle, postMessage } = req.body
    if (!postTitle || !postMessage) {
        return res.status(400).json('Empty fields')
    }
    try {
        await prisma.message.create({
            data: {
                postTitle,
                postMessage,
            },
        })
        res.status(203).json({ message: 'Post has been created' })
    } catch (error) {
        if (error instanceof PrismaClientValidationError) {
            console.log('validationerror')
        } else if (error instanceof PrismaClientUnknownRequestError) {
            console.log(error)
        } else if (error instanceof PrismaClientKnownRequestError) {
            res.status(404).json({ message: error.code })
        } else {
        }

        // console.log(postTitle, postMessage)
    }
}

export const listPost = async (req: Request, res: Response) => {
    try {
        const posts = await prisma.message.findMany()
        res.status(200).json(posts)
    } catch (error) {
        res.status(500)
        console.log(error)
    }
}
