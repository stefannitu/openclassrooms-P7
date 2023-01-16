import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext'

export const New = () => {
    const { isAuthenticated } = useContext(AuthContext)
    console.log('Comming to new')

    // if (!isAuthenticated) return <Navigate to='/login' />
    return <h1>New component</h1>
}
