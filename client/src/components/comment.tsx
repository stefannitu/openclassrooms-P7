import axios from 'axios'
import React, { useRef, useState, useContext } from 'react'
import { axiosInstance } from '../config/axiosConf'
import { AuthContext } from '../context/authContext'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchComments } from '../fetch/fetchers'
import { format } from 'date-fns'

export const Comment = ({ postId }: any) => {
    const commRef = useRef<HTMLInputElement>(null)

    const [errorMessage, setErrorMessage] = useState('')
    const { currentUser } = useContext(AuthContext)
    const queryClient = useQueryClient()
    const { isLoading, error, data } = useQuery({
        queryKey: ['comments', postId],
        queryFn: async () => await fetchComments(postId),
    })

    console.log(data)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setErrorMessage('')

        try {
            const createComment = await axios(
                'http://localhost:4300/api/comment',
                {
                    method: 'POST',
                    withCredentials: true,
                    data: { description: commRef.current!.value, postId },
                }
            )
            setErrorMessage(createComment.data.message)
            commRef.current!.value = ''

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
        <div className='bg-white p-6'>
            {errorMessage ? errorMessage : null}
            <div className='flex w-full items-center gap-4'>
                <img
                    src={`http://localhost:4300/${currentUser?.avatar}`}
                    className='w-10 h-10 rounded-full object-cover'
                />

                <form className='flex gap-4 w-full' onSubmit={handleSubmit}>
                    <input
                        type='text'
                        id='description'
                        name='description'
                        className='border py-0 border-purple-300 focus:outline-none rounded-md hover:border-purple-500 hover:bg-purple-50 px-3 w-full'
                        autoFocus
                        ref={commRef}
                    />
                    <button
                        type='submit'
                        className='group relative flex justify-center rounded-md border border-transparent bg-indigo-600  py-2 px-4 text-lg font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-md'>
                        Post
                    </button>
                </form>
            </div>

            {error
                ? 'Something went wrong'
                : isLoading
                ? 'loading'
                : data.map((comment: any) => (
                      <div className='border py-3 my-3 flex'>
                          <img
                              src={
                                  'http://localhost:4300/' +
                                  comment.author.avatar
                              }
                              className='w-10 h-10 rounded-full object-cover'
                              alt=''
                          />
                          <div className='info'>
                              <span>{comment.author.firstName}</span>
                              <p>{comment.description}</p>
                          </div>
                          <span className='date'>{comment.createdAt}</span>
                      </div>
                  ))}
        </div>
    )
}
