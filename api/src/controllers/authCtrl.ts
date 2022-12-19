import { NextFunction, Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { Prisma, PrismaClient } from '@prisma/client'
import { url } from 'inspector'
// import { UserProfile } from '../Entity/User'
// import { CannotReflectMethodParameterTypeError, TypeORMError } from 'typeorm'
// import { AppDataSource } from '../data-source'

declare module 'express-session' {
  interface SessionData {
    userId: string
    userEmail: string
  }
}

const prisma = new PrismaClient()

//REGISTER controller
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //hash password and create user object
    const hashedUserPassord = await bcrypt.hash(req.body.userPassword, 12)
    await prisma.user.create({
      data: {
        userEmail: req.body.userEmail,
        userPassword: hashedUserPassord,
      },
    })
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return res.status(422).json({
        msg: 'Error saving user.Please check email and password. If you forgot your password use pasword recover',
      })
    }
    console.log(e)
    res.status(422).json({ Message: 'Server error, please try again' })
  }
}

//LOGIN controller

export const login = async (req: Request, res: Response) => {
  if (req.session.userId) {
    return res.json({ msg: 'already logged' })
  }
  if (req.body.userEmail == '' || req.body.userPassword == '') {
    return res.json({ msg: 'Please fill all the fields' })
  }
  try {
    const matchedUser = await prisma.user.findUnique({
      where: { userEmail: req.body.userEmail },
    })
    if (matchedUser) {
      const matchedPaswsord = await bcrypt.compare(
        req.body.userPassword,
        matchedUser.userPassword
      )
      if (matchedPaswsord) {
        req.session.userId = matchedUser.id
        req.session.userEmail = matchedUser.userEmail
        console.log(matchedUser.userEmail)

        res.status(200).redirect('https://www.google.ro')
      }
    }
  } catch (error) {
    res.json({ error })
  }
}
