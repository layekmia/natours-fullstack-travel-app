import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            refetchOnWindowFocus: false,
            staleTime: 5 * 60 * 1000,
            gcTime: 10 * 60 * 1000,
        },
    },
});

// Query key factories for type-safe cache management
export const queryKeys = {
    tours: {
        all: ['tours'] as const,
        lists: () => [...queryKeys.tours.all, 'list'] as const,
        list: (filters: Record<string, any>) => [...queryKeys.tours.lists(), filters] as const,
        details: () => [...queryKeys.tours.all, 'detail'] as const,
        detail: (id: string) => [...queryKeys.tours.details(), id] as const,
    },
    auth: {
        user: ['auth', 'user'] as const,
    },
    reviews: {
        all: ['reviews'] as const,
        byTour: (tourId: string) => [...queryKeys.reviews.all, 'tour', tourId] as const,
    },
    bookings: {
        all: ['bookings'] as const,
        my: () => [...queryKeys.bookings.all, 'my'] as const,
    },
};