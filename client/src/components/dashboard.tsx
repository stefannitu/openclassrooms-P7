import { useContext } from 'react'
import { AuthContext } from '../context/authContext'
import { CreatePost, ListPosts } from './index'

export const Dashboard = () => {
    const { isAuthenticated } = useContext(AuthContext)

    if (!isAuthenticated) return <p>You have to be logged in</p>

    return (
        <>
            <h1>Dashboard</h1>
            <CreatePost />
            <ListPosts />
        </>
    )
}
