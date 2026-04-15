import App from "@/App";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminTours } from "@/components/admin/AdminTours";
import { CreateTour } from "@/pages/admin/CreateTour";
import { EditTour } from "@/pages/admin/EditTour";
import Error from "@/pages/Error";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import { MyBookings } from "@/pages/MyBookings";
import { MyReviews } from "@/pages/MyReviews";
import { Profile } from "@/pages/Profile";
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
      { path: "/tours", element: <Tours /> },
      { path: "/tours/:id", element: <TourDetail /> },
      { path: "/my-bookings", element: <MyBookings /> },
      { path: "/profile", element: <Profile /> },
      { path: "/my-reviews", element: <MyReviews /> },
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
      { path: "/admin/tours/create", element: <CreateTour /> },
      { path: "/admin/tours/edit/:id", element: <EditTour /> },
    ],
  },
]);
