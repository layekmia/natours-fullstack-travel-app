import apiClient from './client';
import { ApiResponse, Review, CreateReviewData, UpdateReviewData } from '../types';

export const reviewsAPI = {
    getTourReviews: (tourId: string): Promise<ApiResponse<Review[]>> =>
        apiClient.get(`/tours/${tourId}/reviews`),

    createReview: (tourId: string, data: CreateReviewData): Promise<ApiResponse<Review>> =>
        apiClient.post(`/tours/${tourId}/reviews`, data),

    updateReview: (reviewId: string, data: UpdateReviewData): Promise<ApiResponse<Review>> =>
        apiClient.patch(`/reviews/${reviewId}`, data),

    deleteReview: (reviewId: string): Promise<ApiResponse<null>> =>
        apiClient.delete(`/reviews/${reviewId}`),
};