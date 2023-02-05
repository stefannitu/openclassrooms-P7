import axios from 'axios'
import React, { useRef, useState, useContext } from 'react'
import { instance } from '../config/axiosConf'
import { AuthContext } from '../context/authContext'
import { useQueryClient } from '@tanstack/react-query'

export const Share = () => {
    const postRef = useRef<HTMLInputElement>(null)
    const imgRef = useRef<HTMLInputElement>(null)

    const [errorMessage, setErrorMessage] = useState('')
    const { currentUser } = useContext(AuthContext)
    const queryClient = useQueryClient()
    /* const upload = async () => {
        try {
            const file = imgRef.current!.files
            const formdata = new FormData()
            formdata.append('file', file![0])
            const uploadPic = await axios('http://localhost:4300/api/upload', {
                method: 'POST',
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true,
                data: formdata,
            })
            return uploadPic.data
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                console.log(error.response?.data.message)
                setErrorMessage(error.response?.data.message)
            }
            setErrorMessage('There was am error when trying to save post')
            console.log(error)
        }
    }
*/
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setErrorMessage('')
        /* 
        try {
            let imgUrl = ''
            if (imgRef.current) imgUrl = await upload()
            console.log('upload done')
        } catch (error) {
            console.log(error)
        }  */

        const formdata = new FormData()
        formdata.append(postRef.current!.name, postRef.current!.value)

        const file = imgRef.current!.files
        if (!file) return console.log('no file')
        formdata.append(imgRef.current!.name, file[0])

        try {
            const createMessage = await axios(
                'http://localhost:4300/api/posts',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'multipart/form-data' },
                    withCredentials: true,
                    data: formdata,
                }
            )
            setErrorMessage(createMessage.data.message)
            postRef.current!.value = ''
            imgRef.current!.value = ''

            queryClient.invalidateQueries(['posts'])
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
                <input
                    type='text'
                    id='description'
                    name='description'
                    className=' border-b-2 border-purple-300 focus:outline-none font-normal px-6 pt-3 rounded-t-md hover:border-purple-500 hover:bg-purple-50'
                    autoFocus
                    ref={postRef}
                />
                {/* <label className='block'> */}
                <span className='sr-only'>Choose post photo</span>
                <input
                    type='file'
                    accept='image/png, image/jpeg'
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
                    className='group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-lg font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mt-2 shadow-md'>
                    Post
                </button>
            </form>
        </div>
    )
}
