import { axiosInstance } from '../config/axiosConf'

export const fetchAuthStatus = async () => {
    const response = await axiosInstance.get('/testUser')
    return response.status
}
