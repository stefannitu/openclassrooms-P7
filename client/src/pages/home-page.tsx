import { Button } from '../components/button'
import { AuthContext } from '../App'
import React, { useContext } from 'react'

export const HomePage = () => {
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext)

    async function handleLogout(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        try {
            await fetch('http://localhost:4300/api/auth/logout', {
                method: 'POST',
                credentials: 'include',
            })
            setIsAuthenticated(false)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='w-full h-full flex flex-col items-center justify-center'>
            <h1 className=' tracking-wide'> Home Page</h1>
            {isAuthenticated ? (
                <>
                    <p>User is authenticated</p>
                    <button
                        className=' bg-purple-400 rounded p-2'
                        onClick={handleLogout}>
                        Logout
                    </button>
                </>
            ) : (
                <div>
                    <Button name='login' />
                    <Button name='register' />
                </div>
            )}
        </div>
    )
}
