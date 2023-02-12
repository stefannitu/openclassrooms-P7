import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext'
import { ChildrenAsPropType } from '../types'

export const ProtectedRoute = ({ children }: ChildrenAsPropType) => {
    const { isAuthenticated } = useContext(AuthContext)

    return !isAuthenticated ? <Navigate to='/login' /> : children
}
