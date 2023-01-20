//TO DO
// disable "register" button
// what happneds when send click register without validating
// message with error when backend server has an error
// Link to Login "already register"
// redirect to login if user is created
// remove unused vars
// refactoring

import axios from 'axios'
import React, { useRef, useState, useContext } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext'

export function Register() {
    const [errorEmail, setErrorEmail] = useState('')
    const [errorPass, setErrorPass] = useState('')
    const [errorRegister, setErrorRegister] = useState('')
    const emailRef = useRef<HTMLInputElement>(null)
    const passRef = useRef<HTMLInputElement>(null)

    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext)

    //action performed when sumit button is clicked
    async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()

        if (
            //if email and password dont have value
            !emailRef.current?.value ||
            !passRef.current?.value
        ) {
            return setErrorRegister('Please fill all fields')
        }
        //prevent button default behavior

        try {
            //send data to API
            const register = await axios(
                'http://localhost:4300/api/auth/register',
                {
                    method: 'POST',
                    withCredentials: true,

                    data: {
                        userEmail: emailRef.current.value,
                        userPassword: passRef.current.value,
                    },
                }
            )

            console.log(register)

            //wait JSON response from server and initialize value to show message in FrontEnd
            setErrorRegister(register.data.message)
            if (register.status == 203) setIsAuthenticated(true)
        } catch (error) {
            setErrorRegister('There is a server error')
        }
    }

    //validate fields when losing blur
    /////////////////////
    function handleBlur(e: React.FormEvent<HTMLInputElement>) {
        //check what field has lost blur and validate
        switch (e.currentTarget.name) {
            case 'userEmail':
                if (
                    //regEx for email
                    /^\w+\b@groupomania\.com\b$/i.test(e.currentTarget.value) &&
                    e.currentTarget.value.length > 0
                ) {
                    e.currentTarget.classList.remove('border-red-400')
                    e.currentTarget.classList.add('border-green-400')
                    setErrorEmail('')
                } else {
                    e.currentTarget.classList.remove('border-green-400')
                    e.currentTarget.classList.add('border-red-400')
                    setErrorEmail('Incorrect email')
                }
                break
            case 'userPassword':
                if (e.currentTarget.value.length > 6) {
                    setErrorPass('')
                } else {
                    setErrorPass('Passwords doesnt match')
                }
                break
            default:
                console.log('test default')
        }
    }

    /////
    //JSX  start
    ///////////////
    return isAuthenticated ? (
        <Navigate to='/' />
    ) : (
        <main
            className='grid place-items-center w-full h-full bg-[url("./assets/company.webp")] bg-center bg-cover
                    before:absolute before:w-full before:h-full before:bg-white before:opacity-75'>
            <section className='flex relative bg-white container max-w-2xl h-fit rounded-lg p-6 '>
                <form className='flex flex-col gap-4 flex-1'>
                    <legend>
                        <h1>Sign Up</h1>
                    </legend>
                    {errorRegister ? errorRegister : null}
                    <label htmlFor='userEmail'>
                        Email: (it has to be @groupomania.com)
                    </label>
                    <input
                        type='email'
                        id='userEmail'
                        name='userEmail'
                        ref={emailRef}
                        // pattern='/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i'
                        onBlur={handleBlur}
                        required
                        autoComplete='on'
                    />

                    <p className=' text-red-500'>{errorEmail}</p>

                    <label htmlFor='userPassword'>
                        Password (more then 6 characters){' '}
                    </label>
                    <input
                        type='password'
                        id='userPassword'
                        name='userPassword'
                        ref={passRef}
                        minLength={6}
                        autoComplete='new-password'
                        onBlur={handleBlur}
                        required
                    />
                    <p className=' text-red-500'>{errorPass}</p>

                    <button
                        className=' bg-red-600 px-5 py-2 rounded-xl w-fit text-lg text-white font-medium hover:bg-red-700 shadow-md shadow-red-200 disabled:saturate-0 disabled:cursor-not-allowed disabled:opacity-40'
                        onClick={handleSubmit}>
                        Register{' '}
                    </button>
                    <p className=' '>
                        Already registered?{' '}
                        <Link to='/login'>
                            <b>Log IN</b>
                        </Link>
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
