import { useContext } from 'react'
import { AuthContext } from '../context/authContext'
import { instance } from '../config/axiosConf'
import { useNavigate, NavLink, Link } from 'react-router-dom'

export const Header = () => {
    const { isAuthenticated, setIsAuthenticated, currentUser } =
        useContext(AuthContext)
    const navigate = useNavigate()

    //
    //start of handlers
    //

    const handleLogout = async () => {
        try {
            await instance.get('/auth/logout')
        } catch (error) {
            console.log(error)
        } finally {
            //always set isAuthenticated t false
            setIsAuthenticated(false)
        }
    }

    //
    //

    const handleClickProfile = () => {
        navigate('/profile', { state: { userId: currentUser?.userId } })
    }

    //
    // end of handlers
    //

    return (
        <header className=' bg-black text-white'>
            <div className=' flex items-center  flex-col mx-auto max-w-[354px] gap-3 py-4 px-1'>
                <div className=' mr-auto'>
                    <Link to='/'>
                        <img src='./src/assets/groupomaniaLogo/icon-left-font-monochrome-white.svg' />
                    </Link>
                </div>
                {isAuthenticated ? (
                    <nav>
                        <ul className='flex items-center gap-4 '>
                            <li className='grid items-center h-16 p-2 border-2 rounded-md border-transparent cursor-pointer hover:border-white hover:bg-slate-800 active:bg-slate-100'>
                                <NavLink to='/'>Posts</NavLink>
                            </li>
                            <li
                                className=' h-16 flex items-center border-2 rounded-md p-2 border-transparent cursor-pointer hover:border-white hover:bg-slate-800'
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
                            <li className=' p-3 border-2 rounded-md border-transparent cursor-pointer hover:border-white hover:bg-slate-800'>
                                <button onClick={handleLogout}>Logout</button>
                            </li>
                        </ul>
                    </nav>
                ) : null}
            </div>
        </header>
    )
}
