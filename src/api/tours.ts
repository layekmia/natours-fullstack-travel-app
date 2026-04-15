import apiClient from "./client";
import { ApiResponse, Tour, TourStats, MonthlyPlan, PaginationParams, TourFilters, TourDataPayload } from '../types';

interface GetToursParams extends PaginationParams, Partial<TourFilters> {
    'price[gte]'?: number;
    'price[lte]'?: number;
    'duration[lte]'?: number;
    'ratingAverage[gte]'?: number;
}

export const toursAPI = {
    getAllTours: (params?: GetToursParams): Promise<ApiResponse<Tour[]>> => {
        const queryParams = new URLSearchParams();
        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    queryParams.append(key, String(value));
                }
            })
        }
        const queryString = queryParams.toString();
        return apiClient.get(`tours${queryString ? `?${queryString}` : ''}`);
    },
    getTour: (id: string): Promise<ApiResponse<Tour>> => apiClient.get(`/tours/${id}`),

    getTopTours: (): Promise<ApiResponse<Tour[]>> => apiClient.get('/tours/top-5-cheap'),

    createTour: (data: TourDataPayload): Promise<ApiResponse<Tour>> =>
        apiClient.post('/tours', data),

    updateTour: (id: string, data: TourDataPayload): Promise<ApiResponse<Tour>> => {
        return apiClient.patch(`/tours/${id}`, data);
    },
    uploadImages: (id: string, formData: FormData) =>
        apiClient.patch(`/tours/${id}/images`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        }),

    deleteTour: (id: string): Promise<ApiResponse<null>> =>
        apiClient.delete(`/tours/${id}`),

    getTourStats: (): Promise<ApiResponse<TourStats[]>> =>
        apiClient.get('/tours/tour-stats'),

    getMonthlyPlan: (year: number): Promise<ApiResponse<MonthlyPlan[]>> =>
        apiClient.get(`/tours/monthly-plan/${year}`),
}