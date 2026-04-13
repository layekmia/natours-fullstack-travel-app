import apiClient from './client';
import { ApiResponse, User } from '../types';

export const usersAPI = {
    getMe: (): Promise<ApiResponse<User>> =>
        apiClient.get('/users/me'),

    updateMe: (formData: FormData): Promise<ApiResponse<User>> =>
        apiClient.patch('/users/updateMe', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }),

    deleteMe: (): Promise<ApiResponse<null>> =>
        apiClient.delete('/users/deleteMe'),

    getAllUsers: (): Promise<ApiResponse<User[]>> =>
        apiClient.get('/users'),

    getUser: (id: string): Promise<ApiResponse<User>> =>
        apiClient.get(`/users/${id}`),

    updateUser: (id: string, data: Partial<User>): Promise<ApiResponse<User>> =>
        apiClient.patch(`/users/${id}`, data),

    deleteUser: (id: string): Promise<ApiResponse<null>> =>
        apiClient.delete(`/users/${id}`),
};