import React from 'react'

export type AuthContextType = {
    isAuthenticated: boolean
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
}

export type UserType = {
    userFirstName: string
    userLastName: string
    userEmail: string
    userId: string
    userAvatar: string
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
    children: JSX.Element
}

export type RegisterUserType = {
    userEmail: string
    userPassword: string
    userFirstName: string
    userLastName: string
    userAvatar: File | undefined
}
