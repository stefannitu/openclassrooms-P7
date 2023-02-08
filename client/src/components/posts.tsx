import { PostCard } from './index'
import { useQuery } from '@tanstack/react-query'
import { fetchPosts } from '../fetch/fetchers'

export const Posts = () => {
    const { status, data } = useQuery({
        queryKey: ['posts'],
        queryFn: fetchPosts,
        // keepPreviousData: true,
    })

    if (status === 'loading') {
        return <div>'Loading ...'</div>
    }
    console.log(data)

    return (
        <div className=' w-full'>
            <ul>
                {data
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
                                    likes={item.likes}
                                    likesNumber={item._count.likes}
                                />
                            </li>
                        )
                    })}
            </ul>
        </div>
    )
}
