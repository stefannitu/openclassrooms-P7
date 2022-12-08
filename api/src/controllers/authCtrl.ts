import { NextFunction, Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { UserProfile } from '../Entity/User'
import { CannotReflectMethodParameterTypeError, TypeORMError } from 'typeorm'
import { AppDataSource } from '../data-source'

//REGISTER controller
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //hash password and create user object
    const hashedUserPassord = await bcrypt.hash(req.body.userPassword, 12)
    const user = new UserProfile()
    user.userEmail = req.body.userEmail
    user.userDisplayName = req.body.userDisplayName
    user.userPassword = hashedUserPassord

    //select userEmail from database.user_profile
    //where email OR displayName (from req.body) already exist in db
    const dbCheckConstrains = await AppDataSource.getRepository(UserProfile)
      .createQueryBuilder('user')
      .where(
        'user.userEmail = :userEmail OR user.userDisplayName = :userDisplayName',
        {
          userEmail: req.body.userEmail,
          userDisplayName: req.body.userDisplayName,
        }
      )
      .getMany()

    //if match the above
    if (dbCheckConstrains.length >= 1) {
      dbCheckConstrains.forEach((element) => {
        //and email from db match req.body.userEmail
        if (element.userEmail == req.body.userEmail) {
          //it means there is a user with this email
          return res.json({ msg: 'email already in db' })
        }
        //else it means the username is taken
        return res.json({ msg: 'username already taken' })
      })
    } else {
      //else proceed and INSERT user in database

      const insertUser = await AppDataSource.getRepository(UserProfile)
        .createQueryBuilder('user')
        .insert()
        .into(UserProfile)
        .values({
          userEmail: req.body.userEmail,
          userPassword: hashedUserPassord,
          userDisplayName: req.body.userDisplayName,
        })
        .execute()

      console.log(insertUser)

      return res.json({ msg: 'user inserted' })
    }

    //ON ANY ERROR
  } catch (error) {
    if (error instanceof TypeORMError) {
      return res.json({ error })
    }
    console.log(error)
    return res.json({ msg: 'Not database but some other error' })
  }
}

//LOGIN controller

export const login = async (req: Request, res: Response) => {
  if (req.body.userEmail == '' || req.body.userPassword == '') {
    return res.json({ msg: 'please fill fields' })
  }
  try {
    const userDB = await AppDataSource.getRepository(UserProfile)
      .createQueryBuilder('user')
      .where('user.userEmail = :userEmail', { userEmail: req.body.userEmail })
      .cache(true)
      .getOne()
    res.json({ userDB })
  } catch (error) {
    res.json({ error })
  }
}
