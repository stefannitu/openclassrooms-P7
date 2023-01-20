import React from 'react'

export type AuthContextType = {
    isAuthenticated: boolean
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
}

export type LoadingContextType = {
    isLoading: boolean
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export type PostAuthorType = {
    userEmail: string
}

export type PostCardTypes = {
    id?: number
    postTitle: string
    postMessage: string
    createdAt: Date
    author: PostAuthorType
}

export type ChildrenAsPropType = {
    children: React.ReactNode
}
