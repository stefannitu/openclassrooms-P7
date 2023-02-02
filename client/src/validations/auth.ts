import { z } from 'zod'

const userEmail = z.string().min(5)
const userPassword = z.string()
const userFirstName = z.string()
const userLastName = z.string()

export const ValidateRegisterUser = z.object({
    userEmail,
    userPassword,
    userFirstName,
    userLastName,
})
