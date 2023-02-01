import React, { createContext, useState } from 'react'
import { AuthContextType, ChildrenAsPropType, UserType } from '../types'
import { axiosInstance } from '../config/axiosConf'
import { AxiosError } from 'axios'

export const AuthContext = createContext({
    isAuthenticated: false,
    setIsAuthenticated: (isAuthenticated: boolean) => {},
    login: (userEmail: string, userPassword: string) => {},
    revalidateUser: () => {},
    // currentUser: {},
    // setCurrentUser: (currentUser: {}) => {},
})

export const AuthContextProvider = ({ children }: ChildrenAsPropType) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    //const [currentUser, setCurrentUser] = useState<UserType>({} as UserType)

    const login = async (userEmail: string, userPassword: string) => {
        const matchedUser = await axiosInstance.post('/auth/login', {
            userEmail: userEmail,
            userPassword: userPassword,
        })

        /* setCurrentUser({
            userId: matchedUser.data.user.id,
            userEmail: matchedUser.data.user.email,
        }) */
        console.log(matchedUser.data.user)

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
