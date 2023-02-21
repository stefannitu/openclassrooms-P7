// import { useContext } from 'react'
import { Posts, Share } from '../components'
// import { AuthContext } from '../context/authContext'

export const Home = () => {
    /*  const { isAuthenticated } = useContext(AuthContext)

    if (!isAuthenticated) return <p>You have to be logged in</p> */

    return (
        <div className='relative'>
            <Share />
            <Posts />
        </div>
    )
}
