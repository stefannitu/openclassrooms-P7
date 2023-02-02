import axios from 'axios'
import { useEffect, useState, useContext } from 'react'
import { PostCard } from './index'
import { LoadingContextType, PostCardTypes } from '../types'
import { LoadingContext } from '../context/loadingContext'

export const Posts = () => {
    const [posts, setPosts] = useState<PostCardTypes[]>([])
    const { isLoading, setIsLoading } = useContext(LoadingContext)

    useEffect(() => {
        const fetchPost = async () => {
            console.log('use effect listcmp')
            try {
                const response = await axios.get(
                    'http://localhost:4300/api/message/post',
                    {
                        withCredentials: true,
                    }
                )
                setPosts(response.data)

                setIsLoading(false)
            } catch (error) {
                console.log(error)
            }
        }
        fetchPost()
    }, [isLoading])

    if (!posts) return null

    return (
        <div className=' w-full'>
            <ul>
                {posts
                    //create card for each post and sort after date
                    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
                    .map((item) => {
                        return (
                            <li key={item.id}>
                                <PostCard
                                    postTitle={item.postTitle}
                                    postMessage={item.postMessage}
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
