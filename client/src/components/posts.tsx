import axios from 'axios'
import { useEffect, useState, useContext } from 'react'
import { PostCard } from './index'
import { LoadingContextType, PostCardTypes } from '../types'
import { LoadingContext } from '../context/loadingContext'
import { useQuery } from '@tanstack/react-query'
import { fetchPosts } from '../fetch/fetchers'

export const Posts = () => {
    const [posts, setPosts] = useState<PostCardTypes[]>([])
    const { isLoading, setIsLoading } = useContext(LoadingContext)
    const { status, data } = useQuery({
        queryKey: ['posts'],
        queryFn: fetchPosts,
    })

    if (status === 'loading') {
        return 'Loading ...'
    }

    /* useEffect(() => {
        const fetchPost = async () => {
            console.log('use effect listcmp')
            try {
                const response = await axiosInstance.get('/posts')
                setPosts(response.data)
                console.log(response.data)

                setIsLoading(false)
            } catch (error) {
                console.log(error)
            }
        }
        fetchPost()
    }, [isLoading])

    if (!posts) return null */

    return (
        <div className=' w-full'>
            <ul>
                {data
                    //create card for each post and sort after date
                    .sort((a: any, b: any) =>
                        a.createdAt > b.createdAt ? 1 : -1
                    )
                    .map((item: any) => {
                        return (
                            <li key={item.id}>
                                <PostCard
                                    description={item.description}
                                    image={item.image}
                                    createdAt={item.createdAt}
                                    author={item.author}
                                />
                            </li>
                        )
                    })}
            </ul>
        </div>
    )
}
