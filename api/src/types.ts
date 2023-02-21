export type RegisterUserType = {
    email: string
    password: string
    firstName: string
    lastName: string
    avatar?: any
}

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
