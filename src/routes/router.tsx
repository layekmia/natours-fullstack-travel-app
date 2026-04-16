import App from "@/App";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminTours } from "@/components/admin/AdminTours";
import { AdminBookings } from "@/pages/admin/AdminBookings";
import { AdminReviews } from "@/pages/admin/AdminReviews";
import { AdminUsers } from "@/pages/admin/AdminUsers";
import { CreateTour } from "@/pages/admin/CreateTour";
import { EditTour } from "@/pages/admin/EditTour";
import { BookingSuccess } from "@/pages/BookingSuccess";
import Error from "@/pages/Error";
import { ForgotPassword } from "@/pages/ForgotPassword";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import { MyBookings } from "@/pages/MyBookings";
import { MyReviews } from "@/pages/MyReviews";
import { NotFound } from "@/pages/not-found";
import { Profile } from "@/pages/Profile";
import { ResetPassword } from "@/pages/ResetPassword";
import SignUp from "@/pages/SignUp";
import { TourDetail } from "@/pages/TourDetail";
import Tours from "@/pages/Tours";
import { createBrowserRouter, Navigate } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },
      { path: "/auth/login", element: <Login /> },
      { path: "/auth/signup", element: <SignUp /> },
      { path: "/auth/forgot-password", element: <ForgotPassword /> },
      { path: "/auth/reset-password/:token", element: <ResetPassword /> },
      { path: "/tours", element: <Tours /> },
      { path: "/tours/:id", element: <TourDetail /> },
      { path: "/my-bookings", element: <MyBookings /> },
      { path: "/profile", element: <Profile /> },
      { path: "/my-reviews", element: <MyReviews /> },
      { path: "/booking-success", element: <BookingSuccess /> },
      // 404 Catch-all - must be last
      { path: "*", element: <NotFound /> },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: "dashboard", element: <AdminDashboard /> },
      { path: "tours", element: <AdminTours /> },
      { path: "users", element: <AdminUsers /> },
      { path: "bookings", element: <AdminBookings /> },
      { path: "reviews", element: <AdminReviews /> },
      { path: "/admin/tours/create", element: <CreateTour /> },
      { path: "/admin/tours/edit/:id", element: <EditTour /> },
      // Admin 404 Catch-all
      { path: "*", element: <NotFound /> },
    ],
  },
]);
