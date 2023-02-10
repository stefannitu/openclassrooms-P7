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
            <div className='bg-yellow-100 max-w-[764px] w-full'>
                <div>User : {getUserQuery.data.user.firstName}</div>
                <div>User : {getUserQuery.data.user.lastName}</div>
                <div>User : {getUserQuery.data.user.email}</div>
                <div>User : {getUserQuery.data.user.avatar}</div>
                {currentUser?.userId == userId ? <button>delete</button> : null}
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
