import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toursAPI } from "@/api/tours";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { TourSkeleton } from "@/components/tours/TourSkeleton";
import { TourMap } from "@/components/tours/TourMap";
import { TourReviews } from "@/components/tours/TourReviews";
import { TourItinerary } from "@/components/tours/TourItinerary";
import { TourGuides } from "@/components/tours/TourGuides";
import { BookingButton } from "@/components/tours/BookingButton";

export const TourDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ["tour", id],
    queryFn: () => toursAPI.getTour(id!),
    enabled: !!id,
  });

  const tour = data?.data;

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
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Tour not found</h1>
        <Button onClick={() => navigate("/tours")}>Back to Tours</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
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
            {/* Quick Info Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                <div className="text-2xl font-bold text-primary-600">
                  {tour.duration}
                </div>
                <div className="text-sm text-gray-600">Days</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                <div className="text-2xl font-bold text-primary-600">
                  {tour.maxGroupSize}
                </div>
                <div className="text-sm text-gray-600">Max Group</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                <div className="text-2xl font-bold text-primary-600">
                  {tour.ratingAverage}
                </div>
                <div className="text-sm text-gray-600">Rating</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                <div className="text-2xl font-bold text-primary-600">
                  ${tour.price}
                </div>
                <div className="text-sm text-gray-600">Per Person</div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-bold mb-4">About This Tour</h2>
              <p className="text-gray-600 leading-relaxed">
                {tour.description}
              </p>
            </div>

            {/* ✅ Map Section - Add this */}
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

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Tour Gallery</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative overflow-hidden rounded-lg aspect-video">
                  <img
                    src={tour.imageCover}
                    alt={tour.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {tour.images?.[0] && (
                  <div className="relative overflow-hidden rounded-lg aspect-video">
                    <img
                      src={tour.images[0]}
                      alt={`${tour.name} gallery 1`}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                )}

                {tour.images?.[1] && (
                  <div className="relative overflow-hidden rounded-lg aspect-video">
                    <img
                      src={tour.images[1]}
                      alt={`${tour.name} gallery 2`}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                )}

                {(!tour.images || tour.images.length < 2) && (
                  <div className="bg-gray-200 rounded-lg aspect-video flex items-center justify-center">
                    <p className="text-gray-500">More images coming soon</p>
                  </div>
                )}
              </div>
            </div>
            <TourReviews tourId={tour._id} />
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-lg shadow-lg p-6">
              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-primary-600">
                  ${tour.price}
                </div>
                <div className="text-sm text-gray-500">per person</div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-semibold">{tour.duration} days</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Max Group Size</span>
                  <span className="font-semibold">
                    {tour.maxGroupSize} people
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Difficulty</span>
                  <span className="font-semibold capitalize">
                    {tour.difficulty}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Rating</span>
                  <span className="font-semibold">
                    {tour.ratingAverage} / 5
                  </span>
                </div>
              </div>

              <BookingButton
                tourId={tour._id}
                tourName={tour.name}
                price={tour.price}
              />

              <p className="text-xs text-gray-500 text-center mt-4">
                Free cancellation up to 30 days before tour
              </p>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                  <span>Secure SSL encrypted payment</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
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
