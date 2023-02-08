import { useRef, useState, useContext, useEffect } from 'react'
import { AuthContext } from '../context/authContext'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'
import { instance } from '../config/axiosConf'
import { GiCheckMark } from 'react-icons/gi'
import { MdError } from 'react-icons/md'

export const Login = () => {
    const navigate = useNavigate()
    const { isAuthenticated, setCurrentUser, setIsAuthenticated } =
        useContext(AuthContext)
    const [revealPass, setRevealPass] = useState(false)
    const [errMessage, setErrMessage] = useState('')

    const emailRef = useRef<HTMLInputElement>(null)
    const passRef = useRef<HTMLInputElement>(null)

    const handleSubmit = async (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault()
        try {
            // const login = async () => {
            const response = await instance.post('/auth/login', {
                email: emailRef.current!.value,
                password: passRef.current!.value,
            })

            setCurrentUser({
                userId: response.data.user.id,
                email: response.data.user.email,
                firstName: response.data.user.firstName,
                lastName: response.data.user.lastName,
                avatar: response.data.user.avatar,
            })

            setErrMessage(response.data.message)
            setIsAuthenticated(true)
        } catch (error) {
            if (error instanceof AxiosError) {
                return setErrMessage(error.response!.data.message)
            }
        }
    }

    return isAuthenticated ? (
        <Navigate to='/' />
    ) : (
        <div className=' h-screen bg-gradient-to-r from-sky-500 to-indigo-600 flex flex-col justify-center items-center gap-5'>
            {errMessage ? (
                <div className=' bg-red-200 text-red-500 font-medium p-3 rounded-md shadow-lg'>
                    <span>{errMessage} </span>
                    <span>
                        <MdError />
                    </span>
                </div>
            ) : null}
            <div className='relative  bg-white rounded-lg shadow-lg  p-7 max-w-[500px] min-w-[374px] m-2 md:m-0 overflow-hidden'>
                <div className='absolute w-44 h-44 -top-20 -right-20 rounded-full bg-gradient-to-l from-sky-500 to-indigo-500 mix-blend-multiply'></div>
                <form className='flex flex-col ' onSubmit={handleSubmit}>
                    <legend>
                        <h1 className=' text-indigo-800 text-center'>Login</h1>
                    </legend>
                    <label htmlFor='email' className='custom-label'>
                        Email
                    </label>
                    <div className='relative'>
                        <input
                            type='email'
                            id='email'
                            name='email'
                            pattern='^[a-zA-Z0-9\.-]+@(\bgroupomania\.com\b)$'
                            required
                            autoFocus
                            autoComplete='on'
                            className='custom-input peer'
                            ref={emailRef}
                        />
                        <span className='absolute -right-6 top-2 cursor-pointer hidden  text-green-500 font-extrabold text-2xl peer-valid:inline-block'>
                            <GiCheckMark />
                        </span>
                        <span
                            id='emailDesc'
                            className=' text-sm text-indigo-600 font-medium'>
                            Email domain should belong to "@groupomania.com"
                        </span>
                    </div>
                    <label htmlFor='password' className='custom-label'>
                        Password
                    </label>
                    <div className='relative'>
                        <input
                            type={revealPass ? 'text' : 'password'}
                            id='password'
                            name='password'
                            autoComplete='on'
                            pattern='^(?=.*[0-9])(?=.*[A-Z]).{6,20}$'
                            required
                            className='custom-input peer'
                            aria-describedby='passDesc'
                            ref={passRef}
                        />
                        <span className='absolute -right-6 top-3 cursor-pointer hidden text-green-500 font-extrabold text-2xl peer-valid:inline-block'>
                            <GiCheckMark />
                        </span>

                        <span
                            className='absolute top-2 right-3 cursor-pointer font-medium text-indigo-800'
                            onClick={() => {
                                setRevealPass(!revealPass)
                            }}>
                            {revealPass ? 'hide' : 'show'}
                        </span>
                    </div>
                    <span
                        id='passDesc'
                        className=' text-sm text-indigo-600 font-medium'>
                        Password must have at least 6 characters, 1 number and 1
                        uppercase
                    </span>
                    <button
                        type='submit'
                        className='group relative flex w-full justify-center rounded-md border-transparent bg-gradient-to-l from-sky-500 to-indigo-500 
					py-2 px-4 text-lg font-medium text-white hover:bg-indigo-700 focus:outline-none 
					 mt-6 shadow-md hover:bg-gradient-to-bl  focus:bg-gradient-to-b'>
                        <span className='absolute inset-y-0 left-0 flex items-center pl-3'></span>
                        Login
                    </button>
                </form>
            </div>
            <div className='mt-4 bg-stone-50 p-1 rounded shadow-md'>
                <span>Not registered? </span>
                <Link to='/register'>
                    <b>Register now</b>
                </Link>
            </div>
        </div>
    )
}
