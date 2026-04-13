
// Generic API Response wrapper
export interface ApiResponse<T = any> {
    success: boolean;
    data: T,
    message?: string;
    result?: number;
}

// Error response from backend
export interface ApiError {
    status: 'fail' | 'error',
    message: string;
    stack?: string;
}

// Pagination params for API calls
export interface PaginationParams {
    page?: string;
    limit?: string;
    sort?: string;
    fields?: string;
}

// Filtering params for tours
export interface TourFilters {
    difficulty?: 'easy' | 'medium' | 'difficult';
    price?: {
        min?: number;
        max?: number;
    };
    rating?: number;
    duration?: number;
    search?: string;
}