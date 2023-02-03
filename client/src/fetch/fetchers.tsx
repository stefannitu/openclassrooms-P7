import { axiosInstance } from '../config/axiosConf'

export const fetchAuthStatus = async () => {
    const response = await axiosInstance.get('/testUser')
    return response.status
}

export const fetchPosts = async () => {
    const response = await axiosInstance.get('/posts')
    return response.data
}
