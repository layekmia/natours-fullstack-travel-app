import { bookingsAPI } from "@/api/bookings";
import { BookingCard } from "@/components/bookings/BookingCard";
import { BookingSkeleton } from "@/components/bookings/BookingSkeleton";
import { EmptyBookings } from "@/components/bookings/EmptyBookings";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Booking } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { AlertCircle, Calendar, DollarSign, TrendingUp } from "lucide-react";

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
  const totalDays = bookings.reduce(
    (sum: number, b: Booking) => sum + (b.tour?.duration || 0),
    0,
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="mb-8">
            <Skeleton className="h-10 w-48 mb-3" />
            <Skeleton className="h-5 w-80" />
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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          <Alert variant="destructive" className="rounded-2xl">
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="mb-10 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 text-sm font-medium mb-4">
            <Calendar className="h-3 w-3" />
            <span>Your Adventures</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent mb-3">
            My Bookings
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your upcoming adventures and past travels
          </p>
        </div>

        {/* Stats Cards - Modern Design */}
        {bookings.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            <div className="group bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-800">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    Total Bookings
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {bookings.length}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Calendar className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                </div>
              </div>
            </div>

            <div className="group bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-800">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    Total Spent
                  </p>
                  <p className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                    ${totalSpent.toLocaleString()}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <DollarSign className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                </div>
              </div>
            </div>

            <div className="group bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-800">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    Adventure Days
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {totalDays}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <TrendingUp className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bookings List */}
        {bookings.length === 0 ? (
          <EmptyBookings />
        ) : (
          <div className="space-y-5">
            {bookings.map((booking: Booking, index: number) => (
              <BookingCard key={booking._id} booking={booking} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
