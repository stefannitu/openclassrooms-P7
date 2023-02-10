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
    try {
        const response = await instance.get(`/comment/${postId}`)

        return response.data.comments
    } catch (error) {
        console.log(error)
    }
}

export const fetchUser = async (userId: string) => {
    try {
        const response = await instance.get(`/users/${userId}`)
        console.log(response)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const fetchUserPosts = async (userId: any) => {
    try {
        const response = await instance.get(`/posts/${userId}?read=yes`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}
