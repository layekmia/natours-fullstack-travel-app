import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, Compass } from "lucide-react";

export const EmptyBookings = () => {
  return (
    <div className="text-center py-12">
      <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
        <Calendar className="h-10 w-10 text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        No Bookings Yet
      </h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        You haven't booked any tours yet. Start your adventure today!
      </p>
      <Button asChild>
        <Link to="/tours">
          <Compass className="h-4 w-4 mr-2" />
          Explore Tours
        </Link>
      </Button>
    </div>
  );
};
