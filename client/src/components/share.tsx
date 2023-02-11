import axios from 'axios'
import React, { useRef, useState, useContext } from 'react'
import { AuthContext } from '../context/authContext'
import { useQueryClient } from '@tanstack/react-query'
import { instance } from '../config/axiosConf'

export const Share = () => {
    const postRef = useRef<HTMLTextAreaElement>(null)
    const imgRef = useRef<HTMLInputElement>(null)

    const [errorMessage, setErrorMessage] = useState('')
    const { currentUser } = useContext(AuthContext)
    const queryClient = useQueryClient()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setErrorMessage('')
        const formdata = new FormData()
        formdata.append(postRef.current!.name, postRef.current!.value)
        const file = imgRef.current!.files
        if (!file) {
            return console.log('no file')
        } else {
            formdata.append(imgRef.current!.name, file[0])
        }

        try {
            const savePost = await instance('posts', {
                method: 'POST',
                headers: { 'Content-Type': 'multipart/form-data' },
                data: formdata,
            })
            setErrorMessage(savePost.data.message)
            postRef.current!.value = ''
            imgRef.current!.value = ''
            queryClient.invalidateQueries({ queryKey: ['posts'], exact: true })
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                setErrorMessage(error.response?.data.message)
            }
            setErrorMessage('There was am error when trying to save post')
        }
    }

    return (
        <div className='bg-white px-6 py-6 rounded-lg shadow-xl min-w-[700px]'>
            {errorMessage ? errorMessage : null}
            <div className='flex items-center gap-4 mb-8'>
                <img
                    src={`http://localhost:4300/${currentUser?.avatar}`}
                    className='w-24 h-24 rounded-full object-cover'
                />
                <p className=' text-gray-500'>
                    What's on your mind {currentUser?.firstName}
                </p>
            </div>
            <form
                encType='multipart/form-data'
                className='flex flex-col gap-4'
                onSubmit={handleSubmit}>
                {/*   <input
                    type='text'
                    id='description'
                    name='description'
                    className=' border-b-2 border-purple-300 focus:outline-none font-normal px-6 pt-3 rounded-t-md hover:border-purple-500'
                    autoFocus
                    required
                    ref={postRef}
                /> */}

                <textarea
                    name='description'
                    id='description'
                    rows={5}
                    className='border resize-none focus:outline-none rounded-md hover:border-gray-300 focus:border-gray-300'
                    ref={postRef}
                    required></textarea>

                <span className='sr-only'>Choose post photo</span>
                <input
                    type='file'
                    accept='image/png, image/jpeg, image/webp'
                    id='image'
                    name='image'
                    className='block w-full text-sm text-slate-500
      						file:mr-4 file:py-2 file:px-4
      						file:rounded-full file:border-0
      						file:text-sm file:font-semibold
      					  file:bg-violet-50 file:text-violet-700
      					  hover:file:bg-violet-100'
                    ref={imgRef}
                />
                {/* </label> */}
                <button
                    type='submit'
                    className='flex w-full justify-center rounded-md border-transparent bg-gradient-to-l from-sky-500 to-indigo-500 
					py-2 px-4 text-lg font-medium text-white hover:bg-indigo-700 focus:outline-none 
					 mt-6 shadow-md hover:bg-gradient-to-bl  focus:bg-gradient-to-b'>
                    Post
                </button>
            </form>
        </div>
    )
}
