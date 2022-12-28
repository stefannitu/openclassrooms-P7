//TO DO
// disable "register" button
// what happneds when send click register without validating
// message with error when backend server has an error
// Link to Login "already register"
// redirect to login if user is created
// remove unused vars
// refactoring

import React, { useRef, useState } from 'react'

export function Register() {
    const [userEmail, setUserEmail] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const [userCheckPassword, setUserCheckPassword] = useState('')
    const [errorEmail, setErrorEmail] = useState('')
    const [errorCheckPass, setErrorCheckPass] = useState('')
    const [errorPass, setErrorPass] = useState('')
    const [errorRegister, setErrorRegister] = useState('')
    const emailRef = useRef<HTMLInputElement>(null)
    const passRef = useRef<HTMLInputElement>(null)
    const passCheckRef = useRef<HTMLInputElement>(null)

    //action performed when sumit button is clicked
    async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()

        if (
            //if email and password dont have value
            !emailRef.current?.value ||
            !passRef.current?.value ||
            !passCheckRef.current?.value ||
            passRef.current.value !== passCheckRef.current.value
        ) {
            return setErrorRegister('Please fill all fields')
        }
        //prevent button default behavior

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            //convert to lowercase
            body: JSON.stringify({
                userEmail: emailRef.current.value,
                userPassword: passRef.current.value,
                userCheckPassword: passCheckRef.current.value,
            }),
        }
        try {
            //send data to API
            const register = await fetch(
                'http://localhost:4300/api/auth/register',
                requestOptions
            )

            console.log(register)

            //wait JSON response from server and initialize value to show message in FrontEnd
            const data = await register.json()
            setErrorRegister(data.message)
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
            case 'userCheckPassword':
                if (
                    e.currentTarget.value.length < 6 ||
                    e.currentTarget.value !== passRef.current?.value
                ) {
                    //TO change error message. we have same message even if pass is smaller then 6 chars
                    setErrorCheckPass('Passwords doesnt match')
                } else {
                    setErrorCheckPass('')
                }
        }
    }

    /////
    //JSX  start
    ///////////////
    return (
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

                    <label htmlFor='userCheckPassword'>Retype password</label>
                    <input
                        type='password'
                        id='userCheckPassword'
                        autoComplete='on'
                        name='userCheckPassword'
                        ref={passCheckRef}
                        onBlur={handleBlur}
                        required
                    />
                    <p className=' text-red-500'>{errorCheckPass}</p>
                    <button
                        className=' bg-red-600 px-5 py-2 rounded-xl w-fit text-lg text-white font-medium hover:bg-red-700 shadow-md shadow-red-200 disabled:saturate-0 disabled:cursor-not-allowed disabled:opacity-40'
                        onClick={handleSubmit}>
                        Register{' '}
                    </button>
                    <p className=' '>
                        Already registered? <b>Log IN</b>
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
