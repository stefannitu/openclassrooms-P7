import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'

const userSchema = Joi.object({
  //check if UserEmail isemail has no spaces, is lowercase and belongs to groupomania.com
  userEmail: Joi.string()
    .trim()
    .lowercase()
    .email()
    .pattern(/^\w+\b@groupomania\.com\b$/)
    .required(),
  userDisplayName: Joi.string().required(),
  //check if userPassword has minimum 5 chars and is not the same with userEmail
  userPassword: Joi.string()
    .min(5)
    .invalid(Joi.ref('userEmail'), 'password', 'Password', 'Pa55w0rd')
    .required(),
  userCheckPassword: Joi.valid(Joi.ref('userPassword')).required(),
})

export const registerValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await userSchema.validateAsync(req.body)
    next()
  } catch (error) {
    console.log(error)

    res.status(422).json({ msg: 'Validation error' })
  }
}
