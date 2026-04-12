import { User } from "./user.types";

export interface Booking {
  _id: string;
  tour: {
    _id: string;
    name: string;
    imageCover: string;
  };
  user: string | User;
  price: number;
  createdAt: string;
  paid: boolean;
}

export interface CheckoutSession {
  id: string;
  url: string;
}