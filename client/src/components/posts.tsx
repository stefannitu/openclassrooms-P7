import { PostCard } from './index'
import { useQuery } from '@tanstack/react-query'
import { fetchPosts } from '../fetch/fetchers'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/authContext'

export const Posts = () => {
    const [newData, setNewData] = useState([])
    const { currentUser } = useContext(AuthContext)

    const { status, data } = useQuery({
        queryKey: ['posts'],
        queryFn: fetchPosts,

        onSuccess: (data) => {
            setNewData(data)
        },
        // keepPreviousData: true,
    })

    if (status === 'loading') {
        return <div>'Loading ...'</div>
    }

    if (status === 'error') {
        return <div>'Error ...'</div>
    }

    const handleReadStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value == 'all') {
            setNewData(() => {
                return data.filter((item: any) => item.reads.length >= 0)
            })
        }

        if (e.target.value == 'read') {
            setNewData(() => {
                return data.filter((item: any) => item.reads.length > 0)
            })
        }
        if (e.target.value == 'unread') {
            setNewData(() => {
                return data.filter((item: any) => item.reads.length == 0)
            })
        }
    }
    return (
        <div className=' w-full'>
            <div className='p-2 my-2 bg-black  text-white'>
                <label htmlFor='readStatus'> Filter data by status: </label>
                <select
                    id='readStatus'
                    name='readStatus'
                    className='text-black tracking-wide '
                    onChange={handleReadStatus}>
                    <option value='all'>All</option>
                    <option value='read'>Read</option>
                    <option value='unread'>Unread</option>
                </select>
            </div>
            <ul>
                {newData &&
                    newData
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
                                        reads={item.reads}
                                    />
                                </li>
                            )
                        })}
            </ul>
        </div>
    )
}
