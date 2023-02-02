import React, { createContext, useState } from 'react'
import { AuthContextType, ChildrenAsPropType, UserType } from '../types'
import { axiosInstance } from '../config/axiosConf'
import { AxiosError } from 'axios'

export const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    setIsAuthenticated: (isAuthenticated: boolean) => {},

    login: () => {},
    revalidateUser: () => {},
    currentUser: {} as UserType | null,
})

export const AuthContextProvider = ({ children }: ChildrenAsPropType) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [currentUser, setCurrentUser] = useState<UserType | null>(null)

    const login = async (userEmail: string, userPassword: string) => {
        const matchedUser = await axiosInstance.post('/auth/login', {
            userEmail: userEmail,
            userPassword: userPassword,
        })

        setCurrentUser({
            userId: matchedUser.data.id,
            userEmail: matchedUser.data.userEmail,
            userFirstName: matchedUser.data.userFirstName,
            userLastName: matchedUser.data.userLastName,
            userAvatar: matchedUser.data.userAvatar,
        })

        setIsAuthenticated(true)
    }

    const revalidateUser = async () => {
        const user = await axiosInstance.get('/testuser')
        setCurrentUser(user.data)
        setIsAuthenticated(true)
    }
    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                login,
                revalidateUser,
                currentUser,
                setIsAuthenticated,
            }}>
            {children}
        </AuthContext.Provider>
    )
}
