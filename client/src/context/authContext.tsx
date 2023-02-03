import React, { createContext, useState } from 'react'
import { AuthContextType, ChildrenAsPropType, UserType } from '../types'
import { axiosInstance } from '../config/axiosConf'

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)
export const AuthContextProvider = ({ children }: ChildrenAsPropType) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [currentUser, setCurrentUser] = useState<UserType | null>(null)

    const login = async (email: string, password: string) => {
        const matchedUser = await axiosInstance.post('/auth/login', {
            email: email,
            password: password,
        })

        setCurrentUser({
            userId: matchedUser.data.id,
            email: matchedUser.data.email,
            firstName: matchedUser.data.firstName,
            lastName: matchedUser.data.lastName,
            avatar: matchedUser.data.avatar,
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
