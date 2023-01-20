import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from '../context/authContext'
import { useContext } from 'react'
import { LoadingContextProvider } from '../context/loadingContext'

export const ProtectedRoute = () => {
    const { isAuthenticated } = useContext(AuthContext)

    return !isAuthenticated ? (
        <Navigate to='/login' />
    ) : (
        <LoadingContextProvider>
            <Outlet />
        </LoadingContextProvider>
    )
}
