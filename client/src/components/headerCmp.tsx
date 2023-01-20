import { Link, NavLink } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/authContext'

export const Header = () => {
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext)

    const handleLogout = async () => {
        try {
            const logout = await fetch(
                'http://localhost:4300/api/auth/logout',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                }
            )

            /*   const logout = await axios(
                'http://localhost:4300/api/auth/logout',
                {
                    method: 'post',
                    withCredentials: true,
                }
            ) */

            console.log(logout)
            setIsAuthenticated(false)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <header className=' bg-fuchsia-400 w-full text-white text-center'>
            <ul className=' flex justify-end items-center gap-9 w-4/5 mx-auto max-[640px]:gap-3 py-10'>
                <li className=' mr-auto'>
                    <h1>Logo</h1>
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
