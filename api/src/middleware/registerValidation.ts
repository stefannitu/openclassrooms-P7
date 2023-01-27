import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'

const userSchema = Joi.object({
    //check if UserEmail isemail has no spaces, is lowercase and belongs to groupomania.com
    userEmail: Joi.string()
        .trim()
        .lowercase()
        .email()
        .pattern(/^[a-zA-Z0-9\.-]+@(\bgroupomania\.com\b)$/)
        .required(),
    //check if userPassword has minimum 5 chars and is not the same with userEmail
    userPassword: Joi.string()
        .min(5)
        .invalid(Joi.ref('userEmail'), 'password', 'Password', 'Pa55w0rd')
        .required(),
    userFirstName: Joi.string().min(2).required(),
    userLastName: Joi.string().min(2).required(),
    // userAvatar: Joi.object().required,
})

export const registerValidation = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        await userSchema.validateAsync(req.body, { abortEarly: false })
        next()
    } catch (error) {
        console.log(error)

        res.status(422).json({ message: 'Invalid request data received' })
    }
}
