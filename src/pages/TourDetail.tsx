import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toursAPI } from "@/api/tours";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { TourSkeleton } from "@/components/tours/TourSkeleton";
import { TourMap } from "@/components/tours/TourMap";
import { TourReviews } from "@/components/tours/TourReviews";
import { TourItinerary } from "@/components/tours/TourItinerary";
import { TourGuides } from "@/components/tours/TourGuides";
import { BookingButton } from "@/components/tours/BookingButton";
import { bookingsAPI } from "@/api/bookings";
import { useAuth } from "@/context/AuthContext";
import { Booking } from "@/types";
import ErrorPage from "./Error";

export const TourDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const { data, isLoading, error } = useQuery({
    queryKey: ["tour", id],
    queryFn: () => toursAPI.getTour(id!),
    enabled: !!id,
  });

  const tour = data?.data;

  const { data: myBookings, isLoading: bookingLoading } = useQuery({
    queryKey: ["my-bookings"],
    queryFn: () => bookingsAPI.getMyBookings(),
    enabled: isAuthenticated,
  });

  const isAlreadyBooked = myBookings?.data?.some(
    (booking: Booking) => booking.tour?._id === tour?._id,
  );

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <TourSkeleton />
      </div>
    );
  }

  if (error || !tour) {
    return (
      <ErrorPage
        error={error instanceof Error ? error : new Error("Tour not found")}
        customTitle="Tour Not Found"
        customMessage="The tour you're looking for doesn't exist or has been removed."
        statusCode={404}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[500px]">
        <img
          src={tour.imageCover}
          alt={tour.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />

        <Button
          variant="outline"
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="container mx-auto">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span
                className={`
                px-3 py-1 rounded-full text-xs font-semibold uppercase
                ${tour.difficulty === "easy" && "bg-green-500"}
                ${tour.difficulty === "medium" && "bg-yellow-500"}
                ${tour.difficulty === "difficult" && "bg-red-500"}
              `}
              >
                {tour.difficulty}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary-600">
                {tour.duration} days
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-2">{tour.name}</h1>
            <p className="text-lg md:text-xl opacity-90 max-w-2xl">
              {tour.summary}
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Tour Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Info - Premium Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Card */}
              <div className="group relative overflow-hidden rounded-2xl bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-gray-200 dark:border-gray-800 p-5 text-center shadow-sm hover:shadow-lg transition-all">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-1">
                  {tour.duration}
                </div>
                <div className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Days
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-2xl bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-gray-200 dark:border-gray-800 p-5 text-center shadow-sm hover:shadow-lg transition-all">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-1">
                  {tour.maxGroupSize}
                </div>
                <div className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Max Group
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-2xl bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-gray-200 dark:border-gray-800 p-5 text-center shadow-sm hover:shadow-lg transition-all">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-1">
                  ⭐ {tour.ratingAverage}
                </div>
                <div className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Rating
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-2xl bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-gray-200 dark:border-gray-800 p-5 text-center shadow-sm hover:shadow-lg transition-all">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-1">
                  ${tour.price}
                </div>
                <div className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Per Person
                </div>
              </div>
            </div>

            <div className="mt-10 relative overflow-hidden rounded-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-gray-200 dark:border-gray-800 p-6 md:p-8 shadow-sm">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary-500/10 blur-3xl rounded-full" />

              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                About this experience
              </h2>

              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-base md:text-lg">
                {tour.description}
              </p>
            </div>

            {tour.startLocation &&
              tour.locations &&
              tour.locations.length > 0 && (
                <TourMap
                  startLocation={tour.startLocation}
                  locations={tour.locations}
                />
              )}

            {tour.locations && tour.locations.length > 0 && (
              <TourItinerary
                locations={tour.locations}
                duration={tour.duration}
              />
            )}
            {tour.guides && tour.guides.length > 0 && (
              <TourGuides guides={tour.guides} />
            )}

            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md border border-gray-100 dark:border-gray-800 overflow-hidden">
              {/* Gallery Header */}
              <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 bg-gradient-to-r from-white to-gray-50 dark:from-gray-900 dark:to-gray-800/50">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-primary-100 dark:bg-primary-900/50">
                    <svg
                      className="h-4 w-4 text-primary-600 dark:text-primary-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Tour Gallery
                  </h2>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 ml-7">
                  Explore the stunning views and experiences awaiting you
                </p>
              </div>

              {/* Gallery Grid */}
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Main Cover Image - Featured */}
                  <div className="relative group overflow-hidden rounded-xl aspect-video cursor-pointer">
                    <img
                      src={tour.imageCover}
                      alt={tour.name}
                      className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-white text-xs font-medium bg-black/50 px-2 py-1 rounded-md backdrop-blur-sm">
                        Cover Image
                      </span>
                      <span className="text-white text-xs bg-black/50 px-2 py-1 rounded-md backdrop-blur-sm">
                        🔍 View
                      </span>
                    </div>
                  </div>

                  {/* First Gallery Image */}
                  {tour.images?.[0] && (
                    <div className="relative group overflow-hidden rounded-xl aspect-video cursor-pointer">
                      <img
                        src={tour.images[0]}
                        alt={`${tour.name} gallery 1`}
                        className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-white text-xs bg-black/50 px-2 py-1 rounded-md backdrop-blur-sm">
                          🔍 View
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Second Gallery Image */}
                  {tour.images?.[1] && (
                    <div className="relative group overflow-hidden rounded-xl aspect-video cursor-pointer">
                      <img
                        src={tour.images[1]}
                        alt={`${tour.name} gallery 2`}
                        className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-white text-xs bg-black/50 px-2 py-1 rounded-md backdrop-blur-sm">
                          🔍 View
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Placeholder for missing images */}
                  {(!tour.images || tour.images.length < 2) && (
                    <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-xl aspect-video flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-300 dark:border-gray-600">
                      <svg
                        className="h-10 w-10 text-gray-400 dark:text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                        More images coming soon
                      </p>
                      <p className="text-gray-400 dark:text-gray-500 text-xs">
                        Check back for updates
                      </p>
                    </div>
                  )}
                </div>

                {/* Gallery Stats */}
                <div className="mt-4 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span>
                        {(tour.images?.filter(Boolean)?.length ?? 0) + 1} photos
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                      <span>High resolution</span>
                    </div>
                  </div>
                  <button className="text-primary-600 dark:text-primary-400 hover:underline text-sm font-medium">
                    View all →
                  </button>
                </div>
              </div>
            </div>
            <TourReviews tourId={tour._id} />
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 border border-transparent dark:border-gray-800">
              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                  ${tour.price}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  per person
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    Duration
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {tour.duration} days
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    Max Group Size
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {tour.maxGroupSize} people
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    Difficulty
                  </span>
                  <span className="font-semibold capitalize text-gray-900 dark:text-white">
                    {tour.difficulty}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    Rating
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {tour.ratingAverage} / 5
                  </span>
                </div>
              </div>

              {isAlreadyBooked ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-center gap-2 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 rounded-lg p-3">
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-medium">Already Booked!</span>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                    asChild
                  >
                    <Link to="/my-bookings">View My Bookings</Link>
                  </Button>
                </div>
              ) : (
                !bookingLoading && (
                  <BookingButton
                    tourId={tour._id}
                    tourName={tour.name}
                    price={tour.price}
                  />
                )
              )}

              <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
                Free cancellation up to 30 days before tour
              </p>

              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                  <span>Secure SSL encrypted payment</span>
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                  <span>Instant booking confirmation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
