import React, { useContext, useRef, useState } from 'react'

import { PostCardTypes } from '../types'
import { format } from 'date-fns'
import { AuthContext } from '../context/authContext'
import { Comment } from './'
import { instance } from '../config/axiosConf'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import { FaRegThumbsUp, FaThumbsUp } from 'react-icons/fa'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { BiCommentDetail } from 'react-icons/bi'

export const PostCard = ({
    description,
    image,
    createdAt,
    author,
    postId,
    comment,
    likes,
    likesNumber,
    reads,
}: PostCardTypes) => {
    const date = new Date(createdAt)
    const [isExpanded, setIsExpanded] = useState(false)
    const { currentUser } = useContext(AuthContext)
    const [commentOpen, setCommentOpen] = useState(false)
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const refCard = useRef<HTMLDivElement>(null)

    // const [isLiked, setIsLiked] = useState<boolean>(!!likes.length)
    // console.log(likes, likes.length, isLiked)

    const deletePost = async () => {
        try {
            await instance('posts/delete/' + postId, {
                method: 'patch',
            })
        } catch (error) {
            console.log(error)
        }
    }

    //LIKES
    const saveLike = async () => {
        try {
            await instance('like', {
                method: 'POST',
                data: { postId, likes },
            })
        } catch (error: any) {
            console.log('There was am error when trying to save post')
        }
    }
    //

    const mutationDelete = useMutation({
        mutationFn: deletePost,
        onSuccess() {
            queryClient.invalidateQueries(['posts'])
        },
    })

    const mutationAddLike = useMutation({
        mutationFn: saveLike,
        onSuccess() {
            queryClient.invalidateQueries(['posts'])
        },
    })

    const handleLikeClick = () => {
        mutationAddLike.mutate()
    }

    const handleDeleteClick = () => {
        mutationDelete.mutate()
    }

    const handleClickComment = () => {
        setCommentOpen(!commentOpen)
    }

    const profileClick = () => {
        navigate('/profile', { state: { userId: author!.id } })
    }

    const handleRead = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (!reads!.length) {
            try {
                await instance('/posts/read', {
                    method: 'post',
                    data: { postId },
                })
            } catch (error) {
                console.log(error)
            }
        }
        refCard.current!.classList!.remove('max-h-52')
        setIsExpanded(true)
    }

    return (
        <div
            className='relative bg-white max-w-[700px] my-5 rounded-lg shadow-2xl mx-auto py-5 px-4 flex flex-col gap-4 max-h-52 overflow-hidden '
            ref={refCard}>
            {/* <div className='absolute  top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed bg-blue-200 opacity-80'></div> */}
            <div className='flex justify-between items-start py-4'>
                <div className=' flex gap-4 '>
                    <img
                        src={`http://localhost:4300/${author!.avatar}`}
                        className='w-12 h-12 rounded-full object-cover'
                    />
                    <div>
                        <p
                            onClick={profileClick}
                            className='font-bold before:contents- '>
                            <span className='text-purple-500 cursor-pointer'>
                                {author!.firstName}
                            </span>{' '}
                            <span className=''>{author!.lastName}</span>
                        </p>
                        <p className=' text-sm text-gray-500'>
                            Posted on :{' '}
                            <span>{format(date, 'dd/MM/yyyy HH:mm')}</span>
                        </p>
                    </div>
                </div>
                <div>
                    {currentUser?.userId == author!.id ? (
                        <button
                            onClick={handleDeleteClick}
                            className=' font-bold text-lg w-12 pb-2 rounded-2xl hover:bg-zinc-200 text-red-500'>
                            <RiDeleteBin6Line />
                        </button>
                    ) : null}
                    {!isExpanded ? (
                        <button onClick={handleRead} className='w-40'>
                            {' '}
                            Read more..
                        </button>
                    ) : null}

                    {reads!.length ? (
                        <div className='p-1 text-center bg-green-400 w-40'>
                            Read
                        </div>
                    ) : null}
                </div>
            </div>
            <div className=' '>
                <p className='pb-4 border-t-4 pt-4 text-gray-600 truncate'>
                    {description}
                </p>
                <div>
                    {image ? (
                        <img
                            src={`http://localhost:4300/${image}`}
                            className='w-full rounded-lg'
                        />
                    ) : null}
                </div>
            </div>
            <div className='flex gap-8 border-t-4 pt-4 items-center text-xl'>
                <div
                    className='flex items-center  gap-2'
                    onClick={handleLikeClick}>
                    {likes!.length ? (
                        <FaThumbsUp className='text-2xl text-green-500' />
                    ) : (
                        <FaRegThumbsUp className='text-2xl' />
                    )}
                    <span>{likesNumber}</span>
                </div>
                <div>
                    <button
                        className='flex flex-row items-center gap-1 '
                        onClick={handleClickComment}>
                        <BiCommentDetail className=' text-2xl font-bold' />
                        <span>{comment}</span>
                    </button>
                </div>
            </div>
            <div>{commentOpen ? <Comment postId={postId} /> : null}</div>
        </div>
    )
}
