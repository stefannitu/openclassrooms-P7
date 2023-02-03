import { useRef, useState, useContext, useEffect } from 'react'
import { AuthContext } from '../context/authContext'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'

export const Login = () => {
    const navigate = useNavigate()
    const { isAuthenticated, login } = useContext(AuthContext)
    const [revealPass, setRevealPass] = useState(false)
    const [errMessage, setErrMessage] = useState('')

    const emailRef = useRef<HTMLInputElement>(null)
    const passRef = useRef<HTMLInputElement>(null)

    const handleSubmit = async (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault()
        try {
            await login(emailRef.current!.value, passRef.current!.value)
            navigate('/')
        } catch (error) {
            if (error instanceof AxiosError) {
                return setErrMessage(error.response!.data.message)
            }
            console.log(error)
        }
        // context to keep the user authenticated across the application
    }

    return isAuthenticated ? (
        <Navigate to='/' />
    ) : (
        <div className='h-screen bg-cyan-400 flex flex-col justify-center items-center gap-5'>
            {errMessage ? errMessage : null}

            <form
                className='flex flex-col  p-5 bg-white rounded-lg shadow-lg'
                onSubmit={handleSubmit}>
                <legend>
                    <h1 className=' text-indigo-800 text-center'>Login</h1>
                </legend>
                <label htmlFor='email' className='custom-label'>
                    Email
                </label>
                <input
                    type='email'
                    id='email'
                    name='email'
                    pattern='^[a-zA-Z0-9\.-]+@(\bgroupomania\.com\b)$'
                    required
                    autoFocus
                    autoComplete='on'
                    className='custom-input'
                    ref={emailRef}
                />
                <span
                    id='emailDesc'
                    className=' text-sm text-indigo-600 font-medium'>
                    Email domain should belong to "@groupomania.com"
                </span>

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
                        className='custom-input'
                        aria-describedby='passDesc'
                        ref={passRef}
                    />
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
                    Password must have at least 6 characters
                </span>
                <button
                    type='submit'
                    className='group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-lg font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mt-6 shadow-md'>
                    <span className='absolute inset-y-0 left-0 flex items-center pl-3'>
                        <svg
                            className='h-5 w-5 text-indigo-500 group-hover:text-indigo-400'
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 20 20'
                            fill='currentColor'
                            aria-hidden='true'>
                            <path
                                fillRule='evenodd'
                                d='M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z'
                                clipRule='evenodd'
                            />
                        </svg>
                    </span>
                    Login
                </button>
            </form>
            <p className='mt-4'>
                Not registered?{' '}
                <Link to='/register'>
                    <b>Register now</b>
                </Link>
            </p>
        </div>
    )
}
