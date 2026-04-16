import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, Compass, Sparkles } from "lucide-react";

export const EmptyBookings = () => {
  return (
    <div className="text-center py-8 md:py-5">
      <div className="relative inline-flex items-center justify-center mb-6">
        <div className="absolute inset-0 bg-primary-100 dark:bg-primary-900/30 rounded-full blur-2xl" />
        <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/50 dark:to-primary-800/50 flex items-center justify-center">
          <Calendar className="h-12 w-12 text-primary-600 dark:text-primary-400" />
        </div>
      </div>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
        No Bookings Yet
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
        You haven't booked any tours yet. Start your adventure today!
      </p>
      <Button
        asChild
        size="lg"
        className="bg-primary-600 hover:bg-primary-700 text-white shadow-lg hover:shadow-xl transition-all group"
      >
        <Link to="/tours">
          <Compass className="h-4 w-4 mr-2 transition-transform group-hover:rotate-12" />
          Explore Tours
          <Sparkles className="h-3 w-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
        </Link>
      </Button>
    </div>
  );
};
