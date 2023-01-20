import axios from 'axios'
import React, { useRef, useState, useContext } from 'react'
import { LoadingContext } from '../context/loadingContext'

export const CreatePost = () => {
    const titleRef = useRef<HTMLInputElement>(null)
    const messageRef = useRef<HTMLTextAreaElement>(null)
    const [errorMessage, setErrorMessage] = useState('')
    const { setIsLoading } = useContext(LoadingContext)

    const handleClick = async (e: React.MouseEvent) => {
        e.preventDefault()
        setErrorMessage('')
        if (!titleRef.current?.value || !messageRef.current?.value) {
            return setErrorMessage('Please fill all fields')
        }
        try {
            const createMessage = await axios(
                'http://localhost:4300/api/message/post',
                {
                    method: 'post',
                    withCredentials: true,
                    data: {
                        postTitle: titleRef.current?.value,
                        postMessage: messageRef.current?.value,
                    },
                }
            )
            setErrorMessage(createMessage.data.message)
            setIsLoading(true)
            titleRef.current.value = ''
            messageRef.current.value = ''
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
        <div className=' max-w-xl border py-4 px-8 rounded-xl bg-white shadow-lg '>
            <form className='flex flex-col gap-1'>
                {errorMessage ? errorMessage : null}
                {/* <label htmlFor='postTitle'></label> */}
                <input
                    type='text'
                    name=''
                    id='postTitle'
                    ref={titleRef}
                    //TO DO
                    //remove apply style from inputcss
                    //clean classes
                />
                <label htmlFor='postMessage'></label>
                <textarea
                    name=''
                    id='postMessage'
                    cols={50}
                    rows={6}
                    ref={messageRef}
                    className='shadow-lg border rounded-md hover:border-blue-400'></textarea>
                <button
                    className='px-5 py-3 border rounded-lg shadow-lg hover:shadow-md '
                    onClick={handleClick}>
                    CREATE POST
                </button>
            </form>
        </div>
    )
}
