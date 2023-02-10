import React from 'react'

export type AuthContextType = {
    isAuthenticated: boolean | null
    revalidateUser: () => void
    // login: (email: string, password: string) => void
    currentUser: UserType | null
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
    setCurrentUser: React.Dispatch<React.SetStateAction<UserType | null>>
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
    id: String
    firstName: string
    lastName: string
    email: String
    avatar: String
}

export type PostCommentType = {
    id: Number
    description: String
    createdAt: Date
    ownerId: String
    postId: Number
}

export type LikesType = {
    postId: number
    ownerId: string
}

export type ReadsType = {
    postId: number
    ownerId: string
}

export type PostCardTypes = {
    postId: number
    description: string
    image: string
    createdAt: Date
    author?: PostAuthorType
    comment?: number
    likes?: LikesType[]
    likesNumber?: number
    reads?: ReadsType[]
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
