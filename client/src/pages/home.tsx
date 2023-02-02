import { useContext } from 'react'
import { Posts, Share } from '../components'
import { AuthContext } from '../context/authContext'

export const Home = () => {
    const { isAuthenticated, currentUser } = useContext(AuthContext)

    if (!isAuthenticated) return <p>You have to be logged in</p>

    return (
        <div className='relative'>
            <h1 className='text-center'>Dashboard</h1>
            <p>{currentUser?.userFirstName}</p>
            <Share />
            <Posts />
        </div>
    )
}
