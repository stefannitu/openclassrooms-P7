import { useContext } from 'react'
import { AuthContext } from '../context/authContext'
import { instance } from '../config/axiosConf'
import { useNavigate, NavLink } from 'react-router-dom'

export const Header = () => {
    const { isAuthenticated, setIsAuthenticated, currentUser } =
        useContext(AuthContext)
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            await instance.get('/auth/logout')
        } catch (error) {
            console.log(error)
        } finally {
            setIsAuthenticated(false)
        }
    }

    const handleClickProfile = () => {
        navigate('/profile', { state: { userId: currentUser?.userId } })
    }

    return (
        <header className=' bg-black w-full text-white text-center'>
            <ul className=' flex justify-end items-center w-4/5 mx-auto max-[640px]:gap-3 py-10'>
                <li className=' mr-auto'>
                    <img
                        src='./src/assets/groupomaniaLogo/icon-left-font-monochrome-white.svg'
                        className=' w-80'
                    />
                </li>

                {isAuthenticated ? (
                    <>
                        <li className='p-5 border-2 rounded-md border-transparent cursor-pointer hover:border-white hover:bg-slate-800 active:bg-slate-100'>
                            <NavLink to='/'>Posts</NavLink>
                        </li>
                        <li
                            className='flex items-center gap-2  p-2 border-2 rounded-md  border-transparent cursor-pointer hover:border-white hover:bg-slate-800'
                            onClick={handleClickProfile}>
                            {currentUser?.firstName} {currentUser?.lastName}
                            <img
                                src={
                                    'http://localhost:4300/' +
                                    currentUser?.avatar
                                }
                                className='w-12 h-12 rounded-full object-cover'
                                alt='user avatar'
                            />
                        </li>
                        <li className='p-5 border-2 rounded-md border-transparent cursor-pointer hover:border-white hover:bg-slate-800'>
                            <button onClick={handleLogout}>Logout</button>
                        </li>
                    </>
                ) : null}
            </ul>
        </header>
    )
}
