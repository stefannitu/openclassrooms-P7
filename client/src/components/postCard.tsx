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
import { MdMarkEmailRead, MdMarkunread } from 'react-icons/md'

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
    const refCardMask = useRef<HTMLDivElement>(null)

    //
    //functions start
    //
    const deletePost = async () => {
        try {
            await instance('posts/delete/' + postId, {
                method: 'patch',
            })
        } catch (error) {
            console.log(error)
        }
    }

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

    const saveRead = async () => {
        try {
            await instance('/posts/read', {
                method: 'post',
                data: { postId },
            })
        } catch (error) {
            console.log(error)
        }
    }
    //
    //functions end
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

    const postReading = useMutation({
        mutationFn: saveRead,
        onSuccess() {
            queryClient.invalidateQueries(['posts'])
        },
    })

    //
    // handlers start
    //

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
            postReading.mutate()
        }
        refCard.current!.classList!.remove('max-h-52')
        refCardMask.current?.classList.add('hidden')
        setIsExpanded(true)
    }

    //
    // handlers end
    //

    return (
        <div
            className='relative bg-white w-[374px] m-2 rounded-lg shadow-2xl mx-auto py-2 px-2 flex flex-col gap-3 max-h-52 overflow-hidden md:w-[570px]'
            ref={refCard}>
            <div
                className='absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed bg-white/70'
                ref={refCardMask}>
                {' '}
                {!isExpanded ? (
                    <button onClick={handleRead} className=''>
                        <span className='bg-black text-white font-bold p-3 text-center absolute top-4 right-16 skew-x-12 hover:bg-neutral-800 focus:bg-stone-800'>
                            {' '}
                            Read more..
                        </span>
                    </button>
                ) : null}{' '}
            </div>
            <div className='flex justify-between items-start py-1 mx-1 '>
                <div className=' flex gap-1 '>
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

                    {reads!.length ? (
                        <MdMarkEmailRead className=' text-2xl text-green-500' />
                    ) : (
                        <MdMarkunread className=' text-2xl text-red-500' />
                    )}
                </div>
            </div>
            <div className='px-1 '>
                <p className='  border-t-4 p-3 text-gray-600 text-elipsis break-words'>
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
