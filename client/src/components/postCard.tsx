import { PostCardTypes } from '../types'
import { format } from 'date-fns'
import { BiCommentDetail } from 'react-icons/bi'
import { useContext, useState } from 'react'
import { AuthContext } from '../context/authContext'
import { Comment } from './comment'
import { instance } from '../config/axiosConf'
import { QueryCache, QueryClient, useQueryClient } from '@tanstack/react-query'

export const PostCard = ({
    description,
    image,
    createdAt,
    author,
    postId,
    comment,
}: PostCardTypes) => {
    const date = new Date(createdAt)
    const { currentUser } = useContext(AuthContext)
    const [commentOpen, setCommentOpen] = useState(false)
    const queryClient = useQueryClient()

    const handleClickComment = () => {
        setCommentOpen(!commentOpen)
    }

    const deletePost = async () => {
        try {
            await instance('posts/delete/' + postId, {
                method: 'patch',
            })
            queryClient.invalidateQueries({ queryKey: ['posts'], exact: true })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className=' bg-white w-full my-5 rounded-lg shadow-lg mx-auto py-5 px-8'>
            <span>post id - {postId}</span>
            <p>{author.email}</p>
            <img
                src={`http://localhost:4300/${author.avatar}`}
                className='w-12 h-12 rounded-full object-cover'
            />
            <p>{description}</p>
            <p>{format(date, 'dd/MM/yyyy HH:mm')}</p>
            {currentUser?.userId == author.id ? (
                <button type='button' onClick={deletePost}>
                    Edit
                </button>
            ) : null}
            {image ? (
                <img
                    src={`http://localhost:4300/${image}`}
                    className='w-full'
                />
            ) : null}
            <br />
            <button
                className='flex flex-row items-center gap-2 w-max '
                onClick={handleClickComment}>
                <BiCommentDetail className=' text-xl font-bold' />
                <span>{comment}</span>
                <span>Comments</span>
            </button>
            {commentOpen ? <Comment postId={postId} /> : null}
        </div>
    )
}
