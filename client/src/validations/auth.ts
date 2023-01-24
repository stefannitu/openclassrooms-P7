import { z } from 'zod'
import { RegisterUserType } from '../types'

const userEmail = z.string().min(5)
const userPassword = z.number()
const userFirstName = z.string()
const userLastName = z.string()

export const ValidateRegisterUser = z.object({
    userEmail,
    userPassword,
    userFirstName,
    userLastName,
})
