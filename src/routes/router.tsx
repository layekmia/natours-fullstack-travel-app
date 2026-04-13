import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "@/App";
import Error from "@/pages/Error";
import Login from "@/pages/Login";
import AuthLayout from "@/components/layouts/AuthLayout";
import Home from "@/pages/Home";
import SignUp from "@/pages/SignUp";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [{ index: true, element: <Home /> }],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { index: true, element: <Navigate to="login" replace /> },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
    ],
  },
]);
