//
//  this context is used for updating post list after each new/modified post

import React, { createContext, useState } from 'react'
import { LoadingContextType, ChildrenAsPropType } from '../types'

export const LoadingContext = createContext<LoadingContextType>(
    {} as LoadingContextType
)

export const LoadingContextProvider: React.FunctionComponent<
    ChildrenAsPropType
> = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false)

    return (
        <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
            {children}
        </LoadingContext.Provider>
    )
}
