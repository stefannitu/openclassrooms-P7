import React from 'react'

export type AuthContextType = {
    isAuthenticated: boolean
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
}

export type PostCardTypes = {
    id?: number
    postTitle: string
    postMessage: string
}

export type ChildrenAsPropType = {
    children: React.ReactNode
}
