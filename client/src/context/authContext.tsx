import React, { createContext, useState } from 'react'
import { AuthContextType, ChildrenAsPropType, UserType } from '../types'
import { axiosInstance } from '../config/axiosConf'
import { AxiosError } from 'axios'

export const AuthContext = createContext({
    isAuthenticated: false,
    setIsAuthenticated: (isAuthenticated: boolean) => {},
    login: (userEmail: string, userPassword: string) => {},
    revalidateUser: () => {},
})

export const AuthContextProvider = ({ children }: ChildrenAsPropType) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const login = async (userEmail: string, userPassword: string) => {
        const matchedUser = await axiosInstance.post('/auth/login', {
            userEmail: userEmail,
            userPassword: userPassword,
        })

        setIsAuthenticated(true)
    }

    const revalidateUser = async () => {
        await axiosInstance.get('/testuser')
        setIsAuthenticated(true)
    }
    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                setIsAuthenticated,
                login,
                revalidateUser,
            }}>
            {children}
        </AuthContext.Provider>
    )
}
