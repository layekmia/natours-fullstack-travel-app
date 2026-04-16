import { AdminStats, ApiResponse, Booking, Guide, Review, Tour, User } from '@/types';
import apiClient from './client';

export const adminAPI = {
    getStats: (): Promise<ApiResponse<AdminStats>> =>
        apiClient.get('/admin/stats'),

    getAllTours: (): Promise<ApiResponse<Tour[]>> =>
        apiClient.get('/tours'),

    getAllUsers: (params?: { page?: number; limit?: number; search?: string }): Promise<ApiResponse<User[]>> =>
        apiClient.get("/users", { params }),
    getAllGuides: (): Promise<ApiResponse<Guide[]>> => apiClient.get('/admin/guides'),

    getAllBookings: (params?: { page?: number; limit?: number; search?: string }): Promise<ApiResponse<Booking[]>> =>
        apiClient.get("/bookings", { params }),

    getAllReviews: (params?: { page?: number; limit?: number; search?: string }): Promise<ApiResponse<Review[]>> =>
        apiClient.get("/reviews", { params }),

    deleteReview: (id: string) => apiClient.delete(`/reviews/${id}`),
    deleteBooking: (id: string) => apiClient.delete(`/admin/bookings/:${id}`),

    deleteTour: (id: string): Promise<ApiResponse<null>> =>
        apiClient.delete(`/admin/tours/${id}`),

    deleteUser: (id: string): Promise<ApiResponse<null>> =>
        apiClient.delete(`/users/${id}`),

    updateUserRole: (id: string, role: string): Promise<ApiResponse<null>> =>
        apiClient.patch(`/admin/${id}/role`, { role }),
};