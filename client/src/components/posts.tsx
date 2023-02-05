import axios from 'axios'
import { PostCard } from './index'
import { useQuery } from '@tanstack/react-query'
import { fetchPosts } from '../fetch/fetchers'

export const Posts = () => {
    const { status, data } = useQuery({
        queryKey: ['posts'],
        queryFn: fetchPosts,
    })

    if (status === 'loading') {
        return <div>'Loading ...'</div>
    }

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
                                    postId={item.id}
                                    description={item.description}
                                    image={item.image}
                                    createdAt={item.createdAt}
                                    author={item.author}
                                    comment={item._count.comment}
                                />
                            </li>
                        )
                    })}
            </ul>
        </div>
    )
}
