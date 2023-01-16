import { Outlet, useNavigate } from 'react-router-dom'
import React, { useContext, useEffect } from 'react'
import { Header, Footer } from '../components'
import { AuthContext } from '../context/authContext'

export const Default = (): JSX.Element => {
    const { isAuthenticated } = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(() => {
        navigate('/')
        console.log('default layout')
    }, [isAuthenticated])
    return (
        <div className=' w-full h-full flex flex-col justify-center items-center'>
            <Header />
            <main className='grid place-items-center bg-gray-50 w-full h-full px-8'>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}
