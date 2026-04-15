import { Booking } from "./booking.types";
import { User } from "./user.types";

export type Difficulty = 'easy' | 'medium' | 'difficult';

export interface Location {
    type: 'Point';
    coordinates: [number, number];
    address: string;
    description: string;
    day?: number;
}

export interface StartLocation extends Location {
    description: string;
}

export interface Guide {
    _id: string;
    name: string;
    email: string;
    photo: string;
    role: 'guide' | 'lead-guide';
}

export interface Tour {
    _id: string;
    name: string;
    slug: string;
    duration: number;
    maxGroupSize: number;
    difficulty: Difficulty;
    ratingAverage: number;
    ratingQuantity: number;
    price: number;
    priceDiscount?: number;
    summary: string;
    description: string;
    imageCover?: string;
    images?: string[];
    startDates: string[];
    startLocation: StartLocation;
    locations: Location[];
    guides: Guide[];
    reviews?: Review[];
    bookingCount: number;
    createdAt: string;
    updatedAt: string;
}

export interface Review {
    _id: string;
    review: string;
    rating: number;
    tour: Tour;
    user: User;
    createdAt: string;
    updatedAt: string;
}

export interface CreateReviewData {
    review: string;
    rating: number;
}

export type UpdateReviewData = Partial<CreateReviewData>;
// Tour Statistics
export interface TourStats {
    _id: string;
    numTours: number;
    avgPrice: number;
    avgRating: number;
    minPrice: number;
    maxPrice: number;
}

// Monthly Plan
export interface MonthlyPlan {
    _id: {
        year: number;
        month: number;
    };
    numTourStarts: number;
    tours: string[];
}


export interface AdminStats {
    totalTours: number;
    totalUsers: number;
    totalBookings: number;
    totalRevenue: number;
    recentBookings: Booking[],
    popularTours: Tour[]
}

export interface TourDataPayload {
    name: string;
    duration: number;
    maxGroupSize: number;
    difficulty: "easy" | "medium" | "difficult";
    price: number;
    priceDiscount?: number;
    summary?: string;
    description: string;
    startLocation: {
        type: "Point";
        coordinates: [number, number];
        description: string;
        address: string;
    };
    locations: Array<{
        type: "Point";
        coordinates: [number, number];
        description: string;
        address: string;
        day: number;
    }>;
    guides: string[]; // Array of guide IDs
    startDates: string[]; // ISO date strings
}