import React, { createContext, useMemo, useState } from 'react'
import { AuthContextType, ChildrenAsPropType } from '../types'

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export const AuthContextProvider: React.FunctionComponent<
    ChildrenAsPropType
> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    /* const value = useMemo(
        () => ({ isAuthenticated, setIsAuthenticated }),
        [isAuthenticated]
    ) */

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    )
}
