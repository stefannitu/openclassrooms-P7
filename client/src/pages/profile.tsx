import { useQueries, useQuery, useQueryClient } from '@tanstack/react-query'
import { useLocation } from 'react-router-dom'
import { PostCard } from '../components'
import { fetchUser, fetchUserPosts } from '../fetch/fetchers'
import { useContext } from 'react'
import { AuthContext } from '../context/authContext'

export const Profile = () => {
    //react router state
    const { state } = useLocation()
    const { userId } = state
    //

    //react  contet api
    const { currentUser } = useContext(AuthContext)
    const [postsQuery, getUserQuery] = useQueries({
        queries: [
            {
                queryKey: ['posts', userId],
                queryFn: async () => fetchUserPosts(userId),
            },
            {
                queryKey: ['user', userId],
                queryFn: async () => fetchUser(userId),
            },
        ],
    })

    if (postsQuery.isLoading) return <p> Data is loading</p>

    return (
        <div>
            <div className='bg-white max-w-[764px] w-full p-5 rounded-lg shadow-lg'>
                <div className='bg-black '>
                    <img
                        src={`http://localhost:4300/${getUserQuery.data.user.avatar}`}
                        alt='avatar'
                        className=' w-36 h-36 rounded-full bg-white mx-auto'
                    />
                </div>
                <div className='grid place-content-center py-3 px-5'>
                    <p className='text-center py-3 text-xl'>
                        <b>User Profile</b>
                    </p>
                    <p>
                        First name : <b>{getUserQuery.data.user.firstName}</b>
                    </p>
                    <p>
                        Last Name : <b>{getUserQuery.data.user.lastName}</b>
                    </p>
                    <p>
                        Email : <b>{getUserQuery.data.user.email}</b>
                    </p>
                    {currentUser?.userId == userId ? (
                        <button
                            type='submit'
                            className='flex w-full justify-center rounded-md border-transparent bg-gradient-to-l from-sky-500 to-indigo-500 
					py-2 px-4 text-lg font-medium text-white hover:bg-indigo-700 focus:outline-none 
					 mt-6 shadow-md hover:bg-gradient-to-bl  focus:bg-gradient-to-b'>
                            Delete user
                        </button>
                    ) : null}
                </div>
            </div>
            <ul>
                {postsQuery.data.map((item: any) => {
                    return (
                        <li key={item.id}>
                            <PostCard
                                postId={item.id}
                                description={item.description}
                                image={item.image}
                                createdAt={item.createdAt}
                                author={item.author}
                                comment={item._count.comment}
                                likes={item.likes}
                                likesNumber={item._count.likes}
                                reads={item.reads}
                            />
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
