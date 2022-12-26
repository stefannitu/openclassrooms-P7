import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function Login() {
    const [userEmail, setUserEmail] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const [userError, setUserError] = useState('')
    const navigate = useNavigate()

    async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()

        if (
            /^(?!\w+\b@groupomania\.com\b$)/i.test(userEmail) ||
            userPassword.length < 6
        ) {
            return setUserError('Please fill all the field2s')
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userEmail, userPassword }),
        }
        try {
            //send data to the server for authentication
            const userLogin = await fetch(
                'http://localhost:4300/api/auth/login',
                requestOptions
            )
            //wait for server
            const loginResponse = await userLogin.json()
            setUserError(loginResponse.message)
            if (loginResponse.message == 'Authentication success') {
                navigate('/')
            }
            console.log(loginResponse)
        } catch (error) {
            console.log('Server Error ' + error)
        }
    }

    //handle what is happening when an input field lose focus
    /////////////////////
    function handleBlur(e: React.FormEvent<HTMLInputElement>) {
        //check field name
        if (e.currentTarget.name == 'userEmail') {
            setUserEmail(e.currentTarget.value)
        }
        if (e.currentTarget.name == 'userPassword') {
            setUserPassword(e.currentTarget.value)
        }
    }

    //JSX  start
    ///////////////
    return (
        <main
            className='grid place-items-center w-full h-full bg-[url("./assets/company.webp")] bg-center bg-cover
                  before:absolute before:w-full before:h-full before:bg-white before:opacity-75'>
            <section className='flex relative bg-white container max-w-2xl h-fit rounded-lg p-6 '>
                <form className='flex flex-col gap-4 flex-1'>
                    <legend>
                        <h1>Login</h1>
                    </legend>
                    {userError ? userError : null}
                    <label htmlFor='userEmail'>Email</label>
                    <input
                        type='email'
                        id='userEmail'
                        name='userEmail'
                        onBlur={handleBlur}
                        required
                        autoComplete='on'
                    />

                    <label htmlFor='userPassword'>Password</label>
                    <input
                        type='password'
                        id='userPassword'
                        name='userPassword'
                        minLength={6}
                        autoComplete='new-password'
                        onBlur={handleBlur}
                        required
                    />
                    <button
                        className=' bg-red-600 px-5 py-2 rounded-xl w-fit text-lg text-white font-medium hover:bg-red-700 shadow-md shadow-red-200 disabled:saturate-0 disabled:cursor-not-allowed disabled:opacity-40'
                        onClick={handleSubmit}>
                        Login{' '}
                    </button>
                    <p className=' '>
                        Not registered? <b>Sign UP</b>
                    </p>
                </form>

                <div className='grid items-center p-0 flex-1'>
                    <img
                        src='icon.svg'
                        alt='picture'
                        className=' rotate-90 transition-all md:rotate-0 '
                    />
                </div>
            </section>
        </main>
    )
}
