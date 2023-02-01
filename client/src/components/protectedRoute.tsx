import { useContext, useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from '../context/authContext'
import { LoadingContextProvider } from '../context/loadingContext'
import { hashQueryKey, useQuery } from '@tanstack/react-query'
import { fetchAuthStatus } from '../fetch/fetchers'
import { ChildrenAsPropType } from '../types'

export const ProtectedRoute = ({ children }: ChildrenAsPropType) => {
    // const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext)
    const isAuthenticated = true

    if (!isAuthenticated) return <Navigate to='/login' />

    return children
}
