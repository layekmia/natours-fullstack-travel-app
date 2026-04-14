import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { ApiError } from '../types';

// Create axios instance with type safety
const apiClient: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
})

// Request interceptor with proper typing
apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error.response?.data)
    }
)

// Response interceptor
apiClient.interceptors.response.use(
    (response) => {
        console.log(response)
        return response.data;
    },
    (error: AxiosError<ApiError>) => {
        console.log(error.response?.data)

        return Promise.reject(error);
    }
)

export default apiClient;