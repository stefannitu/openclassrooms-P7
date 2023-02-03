import { PostCardTypes } from '../types'
import { format } from 'date-fns'
import { useContext } from 'react'
import { AuthContext } from '../context/authContext'

export const PostCard = ({
    description,
    image,
    createdAt,
    author,
}: PostCardTypes) => {
    const date = new Date(createdAt)
    const { currentUser } = useContext(AuthContext)
    return (
        <div className=' bg-white w-full my-5 rounded-lg shadow-lg mx-auto py-5 px-8'>
            <h3></h3>
            <p>{author.email}</p>
            <img
                src={`http://localhost:4300/${author.avatar}`}
                className='w-24 h-24 rounded-full object-cover'
            />
            <p>{description}</p>
            <p>{format(date, 'dd/MM/yyyy HH:mm')}</p>
            {image ? (
                <img
                    src={`http://localhost:4300/${image}`}
                    className='w-full'
                />
            ) : null}
        </div>
    )
}
