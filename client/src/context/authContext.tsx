import React, { createContext, useState } from 'react'
import { AuthContextType, ChildrenAsPropType, UserType } from '../types'
import { instance } from '../config/axiosConf'

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)
export const AuthContextProvider = ({ children }: ChildrenAsPropType) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [currentUser, setCurrentUser] = useState<UserType | null>(null)

    const revalidateUser = async () => {
        try {
            const response = await instance.get('/hascookie')
            setCurrentUser(response.data.user)

            setIsAuthenticated(true)
            console.log(response)
        } catch {
            setIsAuthenticated(false)
        }
    }
    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                setIsAuthenticated,
                revalidateUser,
                currentUser,
                setCurrentUser,
            }}>
            {children}
        </AuthContext.Provider>
    )
}
