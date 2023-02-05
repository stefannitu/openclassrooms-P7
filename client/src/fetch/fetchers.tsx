import { instance } from '../config/axiosConf'

export const fetchAuthStatus = async () => {
    const response = await instance.get('/testUser')
    return response.status
}

export const fetchPosts = async () => {
    const response = await instance.get('/posts')
    console.log(response.data)

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
