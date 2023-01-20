import { PostCardTypes } from '../types'
import { format } from 'date-fns'

export const PostCard = ({
    postTitle,
    postMessage,
    createdAt,
    author,
}: PostCardTypes) => {
    const date = new Date(createdAt)
    return (
        <div className=' bg-white w-96 my-5 rounded-lg shadow-lg mx-auto py-5 px-8'>
            <h3>{postTitle}</h3>
            <p>{author.userEmail}</p>
            <p>{postMessage}</p>
            <p>{format(date, 'dd/MM/yyyy HH:mm')}</p>
        </div>
    )
}
