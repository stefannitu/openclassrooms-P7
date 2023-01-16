import { useContext } from 'react'
import { AuthContext } from '../context/authContext'

export const Header = () => {
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext)
    console.log('header load')

    return (
        <header className=' flex justify-between items-center text-4xl text-white w-full min-h-[100px] px-8 bg-black mb-8 '>
            <p>Header</p>
            <p>User is authenticated: {isAuthenticated ? 'true' : 'false'}</p>
        </header>
    )
}
