import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Loader } from "@/components/common/Loader";
import { ErrorPage } from "@/pages/Error";

interface RoleBasedRouteProps {
  allowedRoles: string[];
  fallbackPath?: string;
  showAccessDenied?: boolean;
}

export const RoleBasedRoute = ({
  allowedRoles,
  fallbackPath = "/",
  showAccessDenied = true,
}: RoleBasedRouteProps) => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size="lg" text="Verifying access..." />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  if (user && !allowedRoles.includes(user.role)) {
    if (showAccessDenied) {
      return (
        <ErrorPage
          customTitle="Access Denied"
          customMessage="You don't have permission to access this page."
          statusCode={403}
          showActions={true}
        />
      );
    }
    return <Navigate to={fallbackPath} replace />;
  }

  return <Outlet />;
};
