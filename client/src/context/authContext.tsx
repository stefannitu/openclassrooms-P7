import React, { createContext, useState } from 'react'
import { AuthContextType, ChildrenAsPropType, UserType } from '../types'

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export const AuthContextProvider = ({ children }: ChildrenAsPropType) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    )
}
