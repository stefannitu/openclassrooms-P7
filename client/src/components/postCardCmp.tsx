import { PostCardTypes } from '../types'
import { format } from 'date-fns'
import { useContext } from 'react'
import { AuthContext } from '../context/authContext'

export const PostCard = ({
    postTitle,
    postMessage,
    createdAt,
    author,
}: PostCardTypes) => {
    const date = new Date(createdAt)
    const { dbUser } = useContext(AuthContext)
    return (
        <div className=' bg-white w-full my-5 rounded-lg shadow-lg mx-auto py-5 px-8'>
            <h3></h3>
            <p>{author.userEmail}</p>
            <p>{postMessage}</p>
            <p>{format(date, 'dd/MM/yyyy HH:mm')}</p>
        </div>
    )
}
