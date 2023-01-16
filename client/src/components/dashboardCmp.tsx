import { Navigate } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { AuthContext } from '../context/authContext'

export const Dashboard = () => {
    const { isAuthenticated } = useContext(AuthContext)
    console.log(`Coming to dashboard. context value: ${isAuthenticated}`)

    return (
        <main>
            Dasboard
            {!isAuthenticated ? <Navigate to='/login' /> : 'true'}
            {/* <p>User is authenticated: {isAuthenticated ? 'true' : 'false'}</p>' */}
        </main>
    )
}
