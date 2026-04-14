import { StartLocation } from "./tour.types";
import { User } from "./user.types";

export interface Booking {
  _id: string;
  tour: {
    _id: string;
    name: string;
    imageCover: string;
    duration: number;
    maxGroupSize: number;
    startLocation: StartLocation;
    ratingAverage: number;
    ratingQuantity: number;
    summary: string;
  };
  user: User;
  price: number;
  createdAt: string;
  paid: boolean;
}

export interface CheckoutSession {
  id: string;
  url: string;
}