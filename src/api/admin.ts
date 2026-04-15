import apiClient from './client';
import { AdminStats, ApiResponse, Booking, Guide, Tour, User } from '@/types';

export const adminAPI = {
    getStats: (): Promise<ApiResponse<AdminStats>> =>
        apiClient.get('/admin/stats'),

    getAllTours: (): Promise<ApiResponse<Tour[]>> =>
        apiClient.get('/tours'),

    getAllUsers: (): Promise<ApiResponse<User[]>> =>
        apiClient.get('/users'),
    getAllGuides: (): Promise<ApiResponse<Guide[]>> => apiClient.get('/admin/guides'),

    getAllBookings: (): Promise<ApiResponse<Booking[]>> =>
        apiClient.get('/bookings'),

    deleteTour: (id: string): Promise<ApiResponse<null>> =>
        apiClient.delete(`/admin/tours/${id}`),

    deleteUser: (id: string): Promise<ApiResponse<null>> =>
        apiClient.delete(`/admin/users/${id}`),

    updateUserRole: (id: string, role: string): Promise<ApiResponse<any>> =>
        apiClient.patch(`/admin/users/${id}/role`, { role }),
};