import apiClient from './client';

export const bookingsAPI = {
    createCheckoutSession: async (tourId: string): Promise<void> => {
        const response = await apiClient.get(`/bookings/checkout-session/${tourId}`);

        const session = response.data;

        if (!session || !session.url) {
            throw new Error('Invalid session response from server');
        }

        window.location.href = session.url;
    },

    getMyBookings: () => apiClient.get('/bookings/my-bookings'),
};