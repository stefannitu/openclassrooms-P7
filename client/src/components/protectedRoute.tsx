import { useContext, useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from '../context/authContext'
import { LoadingContextProvider } from '../context/loadingContext'
import { hashQueryKey, useQuery } from '@tanstack/react-query'
import { fetchAuthStatus } from '../fetch/fetchers'
import { ChildrenAsPropType } from '../types'
import { any } from 'zod'
import { axiosInstance } from '../config/axiosConf'

export const ProtectedRoute = ({ children }: ChildrenAsPropType) => {
    const { isAuthenticated, setIsAuthenticated, revalidateUser } =
        useContext(AuthContext)
    useEffect(() => {
        const test = async () => {
            try {
                await revalidateUser()
            } catch (error) {
                console.log(error)
            }
        }
        console.log('test')
        test()
    }, [])

    if (!isAuthenticated) return <Navigate to='/login' />

    return children
}
