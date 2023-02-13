import React, { useContext, useRef, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext'
import { AxiosError } from 'axios'
import { instance } from '../config/axiosConf'

import { MdError } from 'react-icons/md'
import { GiCheckMark } from 'react-icons/gi'

export const Register = () => {
    const [revealPass, setRevealPass] = useState(false)
    const { isAuthenticated, setIsAuthenticated, setCurrentUser } =
        useContext(AuthContext)
    const [userRegisterMessage, setUserRegisterMessage] = useState('')

    const refFn = useRef<HTMLInputElement>(null)
    const refLn = useRef<HTMLInputElement>(null)
    const refPass = useRef<HTMLInputElement>(null)
    const refEmail = useRef<HTMLInputElement>(null)
    const refAvatar = useRef<HTMLInputElement>(null)

    // const [formData, setFormData] = useState<RegisterUserType>(formInfo)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        // let test = '22'
        try {
            const formdata = new FormData()
            formdata.append(refFn.current!.name, refFn.current!.value)
            formdata.append(refLn.current!.name, refLn.current!.value)
            formdata.append(refPass.current!.name, refPass.current!.value)
            formdata.append(refEmail.current!.name, refEmail.current!.value)
            formdata.append(
                refAvatar.current!.name,
                refAvatar.current!.files![0]
            )

            const response = await instance('/auth/register', {
                method: 'POST',
                data: formdata,
            })

            setCurrentUser({
                userId: response.data.user.id,
                email: response.data.user.email,
                firstName: response.data.user.firstName,
                lastName: response.data.user.lastName,
                avatar: response.data.user.avatar,
            })

            setUserRegisterMessage(response.data.message)
            setIsAuthenticated(true)
        } catch (error) {
            if (error instanceof AxiosError) {
                return setUserRegisterMessage(error!.response!.data.message)
            }
            setUserRegisterMessage('There is a server error please try again')
        }
    }

    return isAuthenticated ? (
        <Navigate to='/login' />
    ) : (
        <div className='h-screen bg-gradient-to-r from-sky-500 to-indigo-600 flex flex-col justify-center items-center gap-5'>
            {userRegisterMessage ? (
                <div className=' bg-red-200 text-red-500 font-medium p-3 rounded-md shadow-lg'>
                    <span>{userRegisterMessage} </span>
                    <span>
                        <MdError />
                    </span>
                </div>
            ) : null}
            <div className='relative  bg-white rounded-lg shadow-lg  p-7 max-w-[500px] min-w-[374px] m-2 md:m-0 overflow-hidden'>
                <form
                    encType='multipart/form-data'
                    onSubmit={handleSubmit}
                    className='flex flex-col '>
                    <legend>
                        <h1 className=' text-indigo-800 text-center'>
                            Register
                        </h1>
                    </legend>
                    <label htmlFor='firstName' className='custom-label'>
                        First Name
                    </label>
                    <div className='relative'>
                        <input
                            type='text'
                            id='firstName'
                            name='firstName'
                            autoFocus
                            autoCapitalize='on'
                            minLength={4}
                            maxLength={10}
                            required
                            className='custom-input peer'
                            ref={refFn}
                        />
                        <span className='absolute -right-6 top-2 cursor-pointer hidden  text-green-500 font-extrabold text-2xl peer-valid:inline-block'>
                            <GiCheckMark />
                        </span>
                    </div>

                    {/* last name */}
                    <label htmlFor='lastName' className='custom-label'>
                        Last Name
                    </label>
                    <div className='relative'>
                        <input
                            type='text'
                            id='lastName'
                            name='lastName'
                            minLength={4}
                            maxLength={10}
                            required
                            className='custom-input peer'
                            ref={refLn}
                        />
                        <span className='absolute -right-6 top-2 cursor-pointer hidden  text-green-500 font-extrabold text-2xl peer-valid:inline-block'>
                            <GiCheckMark />
                        </span>
                    </div>

                    {/* Email */}
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
                            className='custom-input peer'
                            aria-describedby='emailDesc'
                            ref={refEmail}
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

                    {/* avatar */}
                    <label htmlFor='avatar' className='custom-label'>
                        Your Avatar
                    </label>
                    <div className='relative'>
                        <input
                            type='file'
                            accept='image/png, image/jpeg'
                            id='avatar'
                            name='avatar'
                            ref={refAvatar}
                            required
                            className='mt-4 peer'
                        />
                        <span className='absolute -right-6 top-2 cursor-pointer hidden  text-green-500 font-extrabold text-2xl peer-valid:inline-block'>
                            <GiCheckMark />
                        </span>
                    </div>

                    {/* password */}
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
                            ref={refPass}
                        />
                        <span className='absolute -right-6 top-2 cursor-pointer hidden  text-green-500 font-extrabold text-2xl peer-valid:inline-block'>
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
                        uppercase letter
                    </span>
                    <button
                        type='submit'
                        className=' flex w-full justify-center rounded-md border-transparent bg-gradient-to-l from-sky-500 to-indigo-500 
					py-2 px-4 text-lg font-medium text-white hover:bg-indigo-700 focus:outline-none 
					 mt-6 shadow-md hover:bg-gradient-to-bl  focus:bg-gradient-to-b'>
                        Register
                    </button>
                </form>
            </div>
            <div className='mt-4 bg-stone-50 p-1 rounded shadow-md'>
                <span>Already have a user? </span>
                <Link to='/login'>
                    <b>Go to Login</b>
                </Link>
            </div>
        </div>
    )
}
