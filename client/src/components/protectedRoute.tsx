import { useQuery } from '@tanstack/react-query'
import { useContext, useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { instance } from '../config/axiosConf'
import { AuthContext } from '../context/authContext'
import { ChildrenAsPropType } from '../types'

export const ProtectedRoute = ({ children }: ChildrenAsPropType) => {
    const { isAuthenticated, setIsAuthenticated, setCurrentUser } =
        useContext(AuthContext)

    return !isAuthenticated ? <Navigate to='/login' /> : children
}
