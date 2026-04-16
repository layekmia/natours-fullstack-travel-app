import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Compass, Home, ArrowLeft, MapPin, Search } from "lucide-react";

export const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-12">
      <div className="max-w-2xl mx-auto text-center">
        {/* Animated Compass - Smaller */}
        <div className="relative mb-6 inline-flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-primary-500/20 animate-ping" />
          <div className="absolute inset-0 rounded-full bg-primary-500/10 animate-pulse" />
          <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-2xl animate-bounce-slow">
            <Compass className="w-12 h-12 text-white" />
          </div>
        </div>

        {/* Error Code - Smaller */}
        <div className="space-y-2 mb-6">
          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
            404
          </h1>
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-200">
            Page Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm max-w-md mx-auto">
            Oops! The adventure you're looking for seems to have wandered off the map.
          </p>
        </div>

        {/* Suggestions - Compact */}
        <div className="bg-white dark:bg-gray-900 rounded-xl p-4 mb-6 shadow-sm border border-gray-200 dark:border-gray-800">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center justify-center gap-2 text-sm">
            <Search className="h-3.5 w-3.5 text-primary-500" />
            You might want to try:
          </h3>
          <div className="flex flex-wrap justify-center gap-2 text-sm">
            <Link
              to="/"
              className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              • Homepage
            </Link>
            <Link
              to="/tours"
              className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              • Browse Tours
            </Link>
            <Link
              to="/my-bookings"
              className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              • My Bookings
            </Link>
          </div>
        </div>

        {/* Action Buttons - Smaller */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild variant="outline" size="sm" className="gap-1.5">
            <Link to="/">
              <Home className="h-3.5 w-3.5" />
              Back to Home
            </Link>
          </Button>
          <Button asChild size="sm" className="gap-1.5 bg-primary-600 hover:bg-primary-700">
            <Link to="/tours">
              <MapPin className="h-3.5 w-3.5" />
              Explore Tours
            </Link>
          </Button>
        </div>

        {/* Go Back Link - Smaller */}
        <button
          onClick={() => window.history.back()}
          className="mt-4 text-xs text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors inline-flex items-center gap-1"
        >
          <ArrowLeft className="h-3 w-3" />
          Go back to previous page
        </button>
      </div>
    </div>
  );
};