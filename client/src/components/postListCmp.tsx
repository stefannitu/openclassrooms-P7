import axios from 'axios'
import { useEffect, useState, useContext } from 'react'
import { PostCard } from './index'
import { PostCardTypes } from '../types'
import { LoadingContext } from '../context/loadingContext'

export const ListPosts = () => {
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
                console.log(response.data)

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
