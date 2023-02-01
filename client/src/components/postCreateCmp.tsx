import axios from 'axios'
import React, { useRef, useState, useContext } from 'react'
import { AuthContext } from '../context/authContext'
import { LoadingContext } from '../context/loadingContext'

export const CreatePost = () => {
    const messageRef = useRef<HTMLInputElement>(null)
    const [errorMessage, setErrorMessage] = useState('')
    const { setIsLoading } = useContext(LoadingContext)
    const { dbUser } = useContext(AuthContext)

    const onSubmitHandler = async (e: React.FormEvent) => {
        e.preventDefault()
        setErrorMessage('')

        try {
            const createMessage = await axios(
                'http://localhost:4300/api/message/post',
                {
                    method: 'post',
                    withCredentials: true,
                    data: {
                        postMessage: messageRef.current?.value,
                    },
                }
            )
            setErrorMessage(createMessage.data.message)
            setIsLoading(true)
            messageRef.current!.value = ''
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                console.log(error.response?.data.message)
                setErrorMessage(error.response?.data.message)
            }
            setErrorMessage('There was am error when trying to save post')

            console.log(error)
        }
    }

    return (
        <div className='bg-white px-6 py-6 rounded-lg shadow-xl shadow-purple-200 min-w-[700px]'>
            <div className='flex items-center gap-4 mb-8'>
                <img
                    src={`http://localhost:4300/${dbUser.userAvatar}`}
                    className='w-24 h-24 rounded-full object-cover'
                />
                <p className=' text-gray-500'>
                    What's on your mind {dbUser.userFirstName}
                </p>
            </div>
            <form className='flex flex-col gap-4' onSubmit={onSubmitHandler}>
                <input
                    type='text'
                    className=' border-b-2 border-purple-300 focus:outline-none font-normal px-6 pt-3 rounded-t-md hover:border-purple-500 hover:bg-purple-50'
                    autoFocus
                    ref={messageRef}
                />
                <label className='block'>
                    <span className='sr-only'>Choose profile photo</span>
                    <input
                        type='file'
                        className='block w-full text-sm text-slate-500
      						file:mr-4 file:py-2 file:px-4
      						file:rounded-full file:border-0
      						file:text-sm file:font-semibold
      					  file:bg-violet-50 file:text-violet-700
      					  hover:file:bg-violet-100'
                    />
                </label>
                <button
                    type='submit'
                    className='group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-lg font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mt-2 shadow-md'>
                    Post
                </button>
            </form>
        </div>
    )
}
