import { NextFunction, Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { Prisma, PrismaClient } from '@prisma/client'

import { RegisterUserType } from '../types'

//for SessionData
declare module 'express-session' {
    interface SessionData {
        userId: string
        email: string
        firstName: string
        lastName: string
        avatar: string
    }
}

//PRISMA
const prisma = new PrismaClient()

//////////
//REGISTER controller
//////////

export const register = async (req: Request, res: Response) => {
    const { firstName, lastName, email, password }: RegisterUserType = req.body
    console.log(req.body)

    try {
        //hash password and create user object
        const hashedPassword = await bcrypt.hash(password, 12)
        //try to create user with data from body(convert email to lowercase and remove trailling spaces)
        const user: any = await prisma.users.create({
            data: {
                email: email.toLowerCase().trim(),
                password: hashedPassword,
                firstName: firstName.toLowerCase().trim(),
                lastName: lastName.toLowerCase().trim(),
                avatar: req.file!.filename,
            },
        })

        //create session
        req.session.userId = user.id
        req.session.email = user.email
        req.session.firstName = user.firstName
        req.session.lastName = user.lastName
        req.session.avatar = user.avatar

        //response to client
        res.status(203).json({
            message: 'User was succesfully created',
            user,
        })
    } catch (e) {
        //if error is generated by database
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            console.log(e)

            return res.status(422).json({
                message: 'Error saving user. User exists.',
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
    const { email, password }: RegisterUserType = req.body

    /*  //basic check the body fields are not empty
    if (req.body.email == '' || req.body.password == '') {
        return res.json({ message: 'Please fill all the fields' })
    } */

    try {
        //search for user in database
        const user = await prisma.users.findUnique({
            where: { email: email.toLowerCase().trim() },
        })

        //check password
        if (user) {
            const matchedPaswsord = await bcrypt.compare(
                password,
                user.password
            )
            //if data is correct create session object
            if (matchedPaswsord) {
                req.session.userId = user.id
                req.session.email = user.email
                req.session.firstName = user.firstName
                req.session.lastName = user.lastName
                req.session.avatar = user.avatar

                res.status(200).json({
                    message: 'Login Success!',
                    user,
                })
            } else {
                res.status(401).json({
                    message: 'Incorrect password.',
                })
            }
        } else {
            res.status(401).json({
                message: 'No user with this email.',
            })
        }
    } catch (error) {
        console.log(error)

        res.status(500).json({ message: 'There was a server error' })
    }
}

export const logout = async (req: Request, res: Response) => {
    if (!req.session.userId) {
        return res.status(400).json({ message: 'There is no cookie' })
    }

    //session destroy remove cookie from redis
    //res.clearCookie remove cookie from browser
    req.session.destroy(function (err) {
        if (err) {
            return res.status(400).json({ message: 'Logout Error' })
        }
        return res.clearCookie('groupomania.sid').send()
    })
}