import axios from 'axios'

export const instance = axios.create({
    baseURL: 'http://localhost:4300/api/',
    withCredentials: true,
})
