import React from 'react'

export type AuthContextType = {
    isAuthenticated: boolean
    revalidateUser: () => void
    login: (email: string, password: string) => void
    currentUser: UserType | null
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
}

export type UserType = {
    firstName: string
    lastName: string
    email: string
    userId: string
    avatar: string
}

export type LoadingContextType = {
    isLoading: boolean
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export type PostAuthorType = {
    email: string
    avatar: string
}

export type PostCardTypes = {
    postId: number
    description: string
    image: string
    createdAt: Date
    author: PostAuthorType
}

export type ChildrenAsPropType = {
    children: JSX.Element
}

export type RegisterUserType = {
    email: string
    password: string
    firstName: string
    lastName: string
    avatar: File | undefined
}
