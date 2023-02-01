import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:4300/api/',
    withCredentials: true,
})
