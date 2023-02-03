import { PostCardTypes } from '../types'
import { format, fromUnixTime } from 'date-fns'
import { BiCommentDetail } from 'react-icons/bi'
import { useContext, useState } from 'react'
import { AuthContext } from '../context/authContext'
import { Comment } from './comment'

export const PostCard = ({
    description,
    image,
    createdAt,
    author,
    postId,
}: PostCardTypes) => {
    const date = new Date(createdAt)
    const { currentUser } = useContext(AuthContext)
    const [commentOpen, setCommentOpen] = useState(false)

    const handleClickComment = () => {
        setCommentOpen(!commentOpen)
    }

    return (
        <div className=' bg-white w-full my-5 rounded-lg shadow-lg mx-auto py-5 px-8'>
            <h3>{postId}</h3>
            <p>{author.email}</p>
            <img
                src={`http://localhost:4300/${author.avatar}`}
                className='w-12 h-12 rounded-full object-cover'
            />
            <p>{description}</p>
            <p>{format(date, 'dd/MM/yyyy HH:mm')}</p>
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
                <span>0</span> <span>Comments</span>
            </button>
            {commentOpen ? <Comment postId={postId} /> : null}
        </div>
    )
}
