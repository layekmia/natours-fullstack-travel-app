import { useQuery } from "@tanstack/react-query";
import { bookingsAPI } from "@/api/bookings";
import { BookingCard } from "@/components/bookings/BookingCard";
import { BookingSkeleton } from "@/components/bookings/BookingSkeleton";
import { EmptyBookings } from "@/components/bookings/EmptyBookings";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Booking } from "@/types";

export const MyBookings = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["my-bookings"],
    queryFn: () => bookingsAPI.getMyBookings(),
  });

  const bookings = data?.data || [];
  const totalSpent = bookings.reduce(
    (sum: number, booking: Booking) => sum + booking.price,
    0,
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-64" />
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <BookingSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Failed to load bookings. Please try again later.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            My Bookings
          </h1>
          <p className="text-gray-600">
            Manage your upcoming adventures and past travels
          </p>
        </div>

        {/* Stats Cards */}
        {bookings.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <p className="text-sm text-gray-500">Total Bookings</p>
              <p className="text-2xl font-bold text-gray-900">
                {bookings.length}
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <p className="text-sm text-gray-500">Total Spent</p>
              <p className="text-2xl font-bold text-primary-600">
                ${totalSpent.toLocaleString()}
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <p className="text-sm text-gray-500">Adventure Days</p>
              <p className="text-2xl font-bold text-gray-900">
                {bookings.reduce(
                  (sum: number, b: Booking) => sum + (b.tour?.duration || 0),
                  0,
                )}{" "}
                days
              </p>
            </div>
          </div>
        )}

        {/* Bookings List */}
        {bookings.length === 0 ? (
          <EmptyBookings />
        ) : (
          <div className="space-y-4">
            {bookings.map((booking: Booking) => (
              <BookingCard key={booking._id} booking={booking} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
