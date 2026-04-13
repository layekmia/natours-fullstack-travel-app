import apiClient from './client';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { ApiResponse, Booking, CheckoutSession } from '../types';

let stripePromise: Promise<Stripe | null>;

const getStripe = () => {
    if (!stripePromise) {
        stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
    }
    return stripePromise;
};

export const bookingsAPI = {
    createCheckoutSession: async (tourId: string): Promise<void> => {
        const response = await apiClient.get<ApiResponse<CheckoutSession>>(
            `/bookings/checkout-session/${tourId}`
        );
        const session = response.data;

        const stripe = await getStripe();
        if (stripe) {
            await stripe.redirectToCheckout({ sessionId: session.id });
        }
    },

    getMyBookings: (): Promise<ApiResponse<Booking[]>> =>
        apiClient.get('/bookings/my-bookings'),
};