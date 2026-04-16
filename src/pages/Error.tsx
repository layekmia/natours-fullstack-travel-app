import { Button } from "@/components/ui/button";
import {
  AlertCircle,
  ArrowLeft,
  Bug,
  Home,
  RefreshCw,
  WifiOff,
} from "lucide-react";
import { isRouteErrorResponse, Link, useRouteError } from "react-router-dom";

interface ErrorPageProps {
  error?: Error;
  resetErrorBoundary?: () => void;
  errorText?: string;
  customTitle?: string;
  customMessage?: string;
  showActions?: boolean;
  statusCode?: number;
}

export const ErrorPage = ({
  error,
  errorText,
  customTitle,
  customMessage,
  showActions = true,
  statusCode,
}: ErrorPageProps) => {
  const routeError = useRouteError();
  const actualError = error || routeError;

  let errorMessage = "Something went wrong";
  let errorStatus = statusCode || 500;
  let errorType = "unknown";

  // Route error handling
  if (isRouteErrorResponse(actualError)) {
    errorStatus = actualError.status;
    errorMessage = actualError.data?.message || actualError.statusText;

    if (errorStatus === 404) {
      errorType = "not-found";
      errorMessage =
        customMessage || "The page you're looking for doesn't exist";
    } else if (errorStatus === 401) {
      errorType = "unauthorized";
      errorMessage =
        customMessage || "You need to be logged in to access this page";
    } else if (errorStatus === 403) {
      errorType = "forbidden";
      errorMessage =
        customMessage || "You don't have permission to access this page";
    }
  }
  // Standard error handling
  else if (actualError instanceof Error) {
    errorMessage = customMessage || actualError.message;

    if (
      actualError.message.includes("network") ||
      actualError.message.includes("fetch")
    ) {
      errorType = "network";
      errorMessage =
        customMessage || "Network error. Please check your internet connection";
    } else if (actualError.message.includes("timeout")) {
      errorType = "timeout";
      errorMessage = customMessage || "Request timed out. Please try again";
    } else if (
      actualError.message.includes("not found") ||
      actualError.message.includes("404")
    ) {
      errorType = "not-found";
      errorMessage = customMessage || "The requested resource was not found";
    }
  }

  // Use custom error text if provided
  if (errorText) {
    errorMessage = errorText;
  }

  const getIcon = () => {
    switch (errorType) {
      case "network":
        return <WifiOff className="h-16 w-16 text-orange-500" />;
      case "not-found":
        return <AlertCircle className="h-16 w-16 text-yellow-500" />;
      case "unauthorized":
      case "forbidden":
        return <Bug className="h-16 w-16 text-red-500" />;
      default:
        return <AlertCircle className="h-16 w-16 text-primary-500" />;
    }
  };

  const getTitle = () => {
    if (customTitle) return customTitle;

    switch (errorType) {
      case "network":
        return "Connection Error";
      case "not-found":
        return "Page Not Found";
      case "unauthorized":
        return "Access Denied";
      case "forbidden":
        return "Permission Denied";
      default:
        return "Something Went Wrong";
    }
  };

  const getDescription = () => {
    switch (errorType) {
      case "network":
        return "Please check your internet connection and try again.";
      case "not-found":
        return "The page you're looking for might have been moved or deleted.";
      case "unauthorized":
        return "Please log in to continue.";
      case "forbidden":
        return "You don't have permission to access this resource.";
      default:
        return "An unexpected error occurred. Our team has been notified.";
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-12">
      <div className="max-w-md mx-auto text-center">
        {/* Error Icon */}
        <div className="mb-6 inline-flex items-center justify-center">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-red-500/20 animate-ping" />
            <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-red-500 to-red-700 dark:from-red-600 dark:to-red-800 flex items-center justify-center shadow-2xl">
              {getIcon()}
            </div>
          </div>
        </div>

        {/* Error Status */}
        {errorStatus !== 500 && errorStatus && (
          <div className="inline-block px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs font-medium mb-3">
            Error {errorStatus}
          </div>
        )}

        {/* Title & Message */}
        <div className="space-y-2 mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            {getTitle()}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            {errorMessage}
          </p>
          <p className="text-gray-500 dark:text-gray-500 text-xs">
            {getDescription()}
          </p>
        </div>

        {/* Action Buttons */}
        {showActions && (
          <>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={() => window.location.reload()}
                variant="outline"
                size="sm"
                className="gap-1.5"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                Try Again
              </Button>
              <Button
                asChild
                size="sm"
                className="gap-1.5 bg-primary-600 hover:bg-primary-700"
              >
                <Link to="/">
                  <Home className="h-3.5 w-3.5" />
                  Back to Home
                </Link>
              </Button>
            </div>

            {/* Go Back Link */}
            <button
              onClick={() => window.history.back()}
              className="mt-4 text-xs text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors inline-flex items-center gap-1"
            >
              <ArrowLeft className="h-3 w-3" />
              Go back to previous page
            </button>
          </>
        )}

        {/* Error Details (Dev Only) */}
        {import.meta.env.DEV && actualError instanceof Error && (
          <div className="mt-6 p-4 bg-red-50 dark:bg-red-950/30 rounded-lg text-left border border-red-200 dark:border-red-800">
            <p className="text-xs font-mono text-red-600 dark:text-red-400 break-all">
              {actualError.stack || actualError.message}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ErrorPage;
