import { useContext, useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from '../context/authContext'
import { ChildrenAsPropType } from '../types'
import { instance } from '../config/axiosConf'

export const ProtectedRoute = ({ children }: ChildrenAsPropType) => {
    const {
        isAuthenticated,
        revalidateUser,
        setCurrentUser,
        setIsAuthenticated,
    } = useContext(AuthContext)

    return !isAuthenticated ? <Navigate to='/login' /> : children
}
