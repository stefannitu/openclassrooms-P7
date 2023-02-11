import axios from 'axios'
import React, { useRef, useState, useContext } from 'react'
import { instance } from '../config/axiosConf'
import { AuthContext } from '../context/authContext'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchComments } from '../fetch/fetchers'
import { format } from 'date-fns'

import { BsPencilSquare } from 'react-icons/bs'

export const Comment = ({ postId, like }: any) => {
    const commRef = useRef<HTMLInputElement>(null)

    const [errorMessage, setErrorMessage] = useState('')
    const { currentUser } = useContext(AuthContext)
    const queryClient = useQueryClient()
    const { isLoading, error, data } = useQuery({
        queryKey: ['comments', postId],
        queryFn: async () => fetchComments(postId),
    })

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

            queryClient.invalidateQueries(['comments', postId])
            queryClient.invalidateQueries(['posts'])
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                setErrorMessage(error.response?.data.message)
            }
            setErrorMessage('There was am error when trying to save post')
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
                        className='border py-2 text-gray-500 border-purple-300 focus:outline-none rounded-md hover:border-purple-500 hover:bg-purple-50 px-3 w-full'
                        autoFocus
                        ref={commRef}
                    />
                    <button
                        type='submit'
                        className='flex justify-center items-center gap-2 text-xl text-fuchsia-600 '
                        // className='group relative flex justify-center rounded-md  border-transparent bg-gradient-to-l from-sky-500 to-indigo-500 py-2 px-4 text-lg font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-md'
                    >
                        Post
                        <BsPencilSquare />
                    </button>
                </form>
            </div>

            {error
                ? 'Something went wrong'
                : isLoading
                ? 'loading'
                : data.map((comment: any) => (
                      <div
                          className=' py-3 my-3 flex gap-3 flex-col'
                          key={comment.id}>
                          <div className='flex gap-3'>
                              <img
                                  src={
                                      'http://localhost:4300/' +
                                      comment.author.avatar
                                  }
                                  className='w-12 h-12 rounded-full object-cover'
                                  alt=''
                              />

                              <div className='info flex flex-col'>
                                  <p className=' font-medium text-lg'>
                                      {comment.author.firstName}
                                  </p>
                                  <p className='text-sm text-gray-500'>
                                      Posted at:{' '}
                                      <span>
                                          {format(
                                              new Date(comment.createdAt),
                                              'dd/MM/yyyy HH:mm'
                                          )}
                                      </span>
                                  </p>
                              </div>
                          </div>
                          <div className=' border-b-4 pb-2'>
                              <p>{comment.description}</p>
                          </div>
                      </div>
                  ))}
        </div>
    )
}
