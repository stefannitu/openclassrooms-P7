import { useRef, useState, useContext, useEffect } from 'react'
import axios, { AxiosError } from 'axios'
import { AuthContext } from '../context/authContext'
import { useNavigate } from 'react-router-dom'

export const Login = () => {
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext)
    const [formMessage, setFormMessage] = useState('')
    const emailRef = useRef<HTMLInputElement>(null)
    const passRef = useRef<HTMLInputElement>(null)
    const navigate = useNavigate()

    console.log('comming to login')

    const handleSubmit = async (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault()

        //validate fields
        if (!emailRef.current?.value || !passRef.current?.value) {
            return setFormMessage('Please check inserted data')
        }

        try {
            await axios.post(
                'http://localhost:4300/api/auth/login',
                {
                    userEmail: emailRef.current.value,
                    userPassword: passRef.current.value,
                },
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                }
            )
            // context to keep the user authenticated across the application
        } catch (error) {
            if (error instanceof AxiosError) {
                return setFormMessage(error!.response!.data.message)
            }
            setFormMessage('Server error please try again!')
        }
        setIsAuthenticated(true)
        console.log(isAuthenticated)
    }

    return (
        <div className=' px-12 py-8 rounded-xl bg-white border-blue-600 border-t-8 max-w-sm shadow-xl'>
            <form className='flex flex-col gap-3 ' onSubmit={handleSubmit}>
                <legend>
                    <h1>Login</h1>
                </legend>
                {formMessage ? formMessage : null}
                {isAuthenticated ? ' true ' : ' false '}
                <label htmlFor='userEmail'>Email</label>
                <input
                    type='email'
                    id='userEmail'
                    name='userEmail'
                    ref={emailRef}
                    //clear error shown error messagesif they are any
                    onClick={() => {
                        setFormMessage('')
                    }}
                    required
                    autoComplete='on'
                />

                <label htmlFor='userPassword'>Password</label>
                <input
                    type='password'
                    id='userPassword'
                    name='userPassword'
                    ref={passRef}
                    //clear error shown error messagesif they are any
                    onClick={() => {
                        setFormMessage('')
                    }}
                    minLength={6}
                    autoComplete='new-password'
                    required
                />
                <button className=' bg-blue-600 text-white  font-bold w-fit px-8 py-2 rounded-md shadow-xl hover:bg-blue-500'>
                    LogIn
                </button>
            </form>
            <p className='mt-4'>
                Not registered? <b>Register now</b>
            </p>
        </div>
    )
}
