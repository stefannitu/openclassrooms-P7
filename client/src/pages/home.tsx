import { useContext } from 'react'
import { AuthContext } from '../context/authContext'

export const Home = () => {
    const { isAuthenticated, dbUser } = useContext(AuthContext)

    if (!isAuthenticated) return <p>You have to be logged in</p>

    return (
        <div className='relative'>
            <h1 className='text-center'>Dashboard</h1>
        </div>
    )
}
