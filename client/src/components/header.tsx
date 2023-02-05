import { NavLink } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/authContext'
import { instance } from '../config/axiosConf'

export const Header = () => {
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext)

    const handleLogout = async () => {
        try {
            const logout = await instance.get('/auth/logout')
        } catch (error) {
            console.log(error)
        } finally {
            setIsAuthenticated(false)
        }
    }

    return (
        <header className=' bg-black w-full text-white text-center'>
            <ul className=' flex justify-end items-center gap-9 w-4/5 mx-auto max-[640px]:gap-3 py-10'>
                <li className=' mr-auto'>
                    <img
                        src='./src/assets/groupomaniaLogo/icon-left-font-monochrome-white.svg'
                        className=' w-80'
                    />
                </li>
                <li>
                    <NavLink to='about' className=' active:text-3xl'>
                        <button>About</button>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='contact' className=' active:text-3xl'>
                        <button>Contact</button>
                    </NavLink>
                </li>
                {isAuthenticated ? (
                    <li>
                        <button onClick={handleLogout}>Logout</button>
                    </li>
                ) : null}
            </ul>
        </header>
    )
}
