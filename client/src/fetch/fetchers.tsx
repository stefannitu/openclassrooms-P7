import { instance } from '../config/axiosConf'

export const fetchAuthStatus = async () => {
    const response = await instance.get('/testUser')
    return response.status
}

export const fetchPosts = async () => {
    const response = await instance.get('/posts')
    return response.data
}

export const fetchComments = async (postId: number) => {
    const response = await instance.get(`/comment/${postId}`)
    return response.data.comments
}

export const fetchUser = async (userId: string) => {
    const response = await instance.get(`/users/${userId}`)
    return response.data
}

export const fetchUserPosts = async (userId: any) => {
    const response = await instance.get(`/posts/${userId}?read=yes`)
    return response.data
}
