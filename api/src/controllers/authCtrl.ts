import { NextFunction, Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { Prisma, PrismaClient } from '@prisma/client'

import { RegisterUserType } from '../types'

//for SessionData
declare module 'express-session' {
    interface SessionData {
        userId: string
        userEmail: string
        userFirstName: string
        userLastName: string
        userAvatar: string
    }
}

//PRISMA
const prisma = new PrismaClient()

//////////
//REGISTER controller
//////////

export const register = async (req: Request, res: Response) => {
    const {
        userFirstName,
        userLastName,
        userEmail,
        userPassword,
    }: RegisterUserType = req.body

    try {
        //hash password and create user object
        const hashedUserPassord = await bcrypt.hash(req.body.userPassword, 12)
        //try to create user with data from body(convert email to lowercase and remove trailling spaces)
        const user: any = await prisma.user.create({
            data: {
                userEmail: userEmail.toLowerCase().trim(),
                userPassword: hashedUserPassord,
                userFirstName: userFirstName.toLowerCase().trim(),
                userLastName: userLastName.toLowerCase().trim(),
                userAvatar: req.file!.filename,
            },
        })
        //log testsreq.body
        // console.log(req.file)

        //create session
        req.session.userId = user.id
        req.session.userEmail = user.userEmail
        req.session.userFirstName = user.userFirstName
        req.session.userLastName = user.userLastName
        req.session.userAvatar = user.userAvatar

        //response to client
        res.status(203).json({
            message: 'User was succesfully created',
        })

        console.log(user)
    } catch (e) {
        //if error is generated by database
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            console.log(e)

            return res.status(422).json({
                message:
                    'Error saving user. Please check email/password requirements.',
            })
        }
        // if there is an error but not from prima then send to client
        console.log(e)

        res.status(500).json({
            message: 'Server error, please try again',
        })
    }
}

///////
//LOGIN controller
///////

export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    //basic check the body fields are not empty
    if (req.body.userEmail == '' || req.body.userPassword == '') {
        return res.json({ message: 'Please fill all the fields' })
    }

    try {
        //search for user in database
        const matchedUser = await prisma.user.findUnique({
            where: { userEmail: req.body.userEmail.toLowerCase().trim() },
        })

        //check password
        if (matchedUser) {
            const matchedPaswsord = await bcrypt.compare(
                req.body.userPassword,
                matchedUser.userPassword
            )
            //if data is correct create session object
            if (matchedPaswsord) {
                req.session.userId = matchedUser.id
                req.session.userEmail = matchedUser.userEmail
                req.session.userFirstName = matchedUser.userFirstName
                req.session.userLastName = matchedUser.userLastName
                req.session.userAvatar = matchedUser.userAvatar

                res.status(200).json(matchedUser)
            } else {
                res.status(401).json({
                    message: 'User/password incorrect combination.',
                })
            }
        } else {
            res.status(401).json({
                message: 'No user with this password.',
            })
        }
    } catch (error) {
        res.status(500).json({ message: 'There was a server error' })
    }
}

export const logout = async (req: Request, res: Response) => {
    if (!req.session.userId) {
        return res.status(400).json({ message: 'There is no cookie' })
    }

    //TO DO- Check what happends if we delete cookie from redis but not from browser
    //session destroy remove cookie from redis
    //res.clearCookie remove cookie from browser
    req.session.destroy(function (err) {
        if (err) {
            return res.status(400).json({ message: 'Logout Error' })
        }
        return res.clearCookie('groupomania.sid').send()
    })
}
