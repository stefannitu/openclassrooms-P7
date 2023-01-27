import React, { useContext, useRef, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext'
import { RegisterUserType } from '../types'
import axios, { AxiosError } from 'axios'

export const Register = () => {
    const [revealPass, setRevealPass] = useState(false)
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext)
    const [userRegisterMessage, setUserRegisterMessage] = useState('')

    const refUserFirstName = useRef<HTMLInputElement>(null)
    const refUserLastName = useRef<HTMLInputElement>(null)
    const refUserPassword = useRef<HTMLInputElement>(null)
    const refUserEmail = useRef<HTMLInputElement>(null)
    const refUserAvatar = useRef<HTMLInputElement>(null)

    // const [formData, setFormData] = useState<RegisterUserType>(formInfo)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const formdata = new FormData()
        // if (!refUserFirstName.current) return
        formdata.append(
            refUserFirstName.current!.name,
            refUserFirstName.current!.value
        )
        formdata.append(
            refUserLastName.current!.name,
            refUserLastName.current!.value
        )
        formdata.append(
            refUserPassword.current!.name,
            refUserPassword.current!.value
        )
        formdata.append(refUserEmail.current!.name, refUserEmail.current!.value)
        const file = refUserAvatar.current!.files
        if (!file) return console.log('no file')
        formdata.append(refUserAvatar.current!.name, file[0])

        try {
            //send data to API
            const register = await axios(
                'http://localhost:4300/api/auth/register',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'multipart/form-data' },
                    withCredentials: true,
                    data: formdata,
                }
            )

            setUserRegisterMessage(register.data.message)
            if (register.status == 203) setIsAuthenticated(true)
        } catch (error) {
            if (error instanceof AxiosError) {
                return setUserRegisterMessage(error!.response!.data.message)
            }
            setUserRegisterMessage('There is a server error please try again')
        }
    }

    /*   //set formData for text input fields
    const onBlurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
        formdata.set(e.target.name, e.target.value)
    }
    //set formData for "input file"
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files
        if (!file) return console.log('no file')
        formdata.set('userAvatar', file![0])
    } */

    return isAuthenticated ? (
        <Navigate to='/' />
    ) : (
        <div>
            {userRegisterMessage ? userRegisterMessage : null}
            <form
                encType='multipart/form-data'
                onSubmit={handleSubmit}
                className='flex flex-col  p-5 bg-white rounded-lg shadow-lg'>
                <legend>
                    <h1 className=' text-indigo-800 text-center'>Register</h1>
                </legend>

                <label htmlFor='userFirstName' className='custom-label'>
                    First Name
                </label>
                <input
                    type='text'
                    id='userFirstName'
                    name='userFirstName'
                    autoFocus
                    autoCapitalize='on'
                    minLength={4}
                    maxLength={10}
                    required
                    className='custom-input'
                    ref={refUserFirstName}
                    // onBlur={onBlurHandler}
                />
                <label htmlFor='userLastName' className='custom-label'>
                    Last Name
                </label>
                <input
                    type='text'
                    id='userLastName'
                    name='userLastName'
                    minLength={4}
                    maxLength={10}
                    required
                    className='custom-input'
                    ref={refUserLastName}
                    // onBlur={onBlurHandler}
                />

                <label htmlFor='userEmail' className='custom-label'>
                    Email
                </label>
                <input
                    type='email'
                    id='userEmail'
                    name='userEmail'
                    pattern='^[a-zA-Z0-9\.-]+@(\bgroupomania\.com\b)$'
                    required
                    className='custom-input'
                    aria-describedby='emailDesc'
                    ref={refUserEmail}
                    // onBlur={onBlurHandler}
                />

                <input
                    type='file'
                    accept='image/png, image/jpeg'
                    id='userAvatar'
                    name='userAvatar'
                    // onBlur={onChangeHandler}
                    ref={refUserAvatar}
                    required
                />
                <span
                    id='emailDesc'
                    className=' text-sm text-indigo-600 font-medium'>
                    Email domain should belong to "@groupomania.com"
                </span>

                <label htmlFor='userPassword' className='custom-label'>
                    Password
                </label>
                <div className='relative'>
                    <input
                        type={revealPass ? 'text' : 'password'}
                        id='userPassword'
                        name='userPassword'
                        autoComplete='on'
                        pattern='^(?=.*[0-9])(?=.*[A-Z]).{6,20}$'
                        required
                        className='custom-input'
                        aria-describedby='passDesc'
                        ref={refUserPassword}
                        // onBlur={onBlurHandler}
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
                    Register
                </button>
            </form>
        </div>
    )
}
