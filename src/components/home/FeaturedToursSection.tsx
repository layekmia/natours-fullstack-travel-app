import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toursAPI } from "@/api/tours";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight, Star, Clock, Users, MapPin, Eye } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";

export const FeaturedToursSection = () => {
  const { data: topTours, isLoading } = useQuery({
    queryKey: ["top-tours"],
    queryFn: () => toursAPI.getTopTours(),
  });

  const featuredTours = topTours?.data || [];

  // Loading Skeleton
  if (isLoading) {
    return (
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <Skeleton className="h-10 w-48 mb-2" />
              <Skeleton className="h-5 w-64" />
            </div>
            <Skeleton className="h-10 w-24" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <CardContent className="p-4 space-y-3">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-8 w-24" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white dark:bg-gray-950 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-100/30 dark:bg-primary-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-primary-100/30 dark:bg-primary-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 text-sm font-medium mb-4">
              <Star className="h-3 w-3 fill-current" />
              <span>Top Rated</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Featured Tours
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Our most popular adventures chosen by travelers
            </p>
          </div>
          <Button
            variant="ghost"
            asChild
            className="group text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
          >
            <Link to="/tours" className="gap-2">
              View All
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        {/* Tours Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {featuredTours.slice(0, 3).map((tour, index) => (
            <Card
              key={tour._id}
              className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white dark:bg-gray-900 py-0"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image Container */}
              <div className="relative overflow-hidden h-56">
                <img
                  src={tour.imageCover}
                  alt={tour.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Price Badge */}
                <div className="absolute top-4 right-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-full px-3 py-1.5 text-sm font-bold text-primary-600 dark:text-primary-400 shadow-lg">
                  {formatCurrency(tour.price)}
                </div>

                {/* Difficulty Badge */}
                <div className="absolute top-4 left-4">
                  <span
                    className={cn(
                      "px-3 py-1 rounded-full text-xs font-semibold uppercase shadow-lg",
                      tour.difficulty === "easy" && "bg-green-500 text-white",
                      tour.difficulty === "medium" &&
                        "bg-yellow-500 text-white",
                      tour.difficulty === "difficult" &&
                        "bg-red-500 text-white",
                    )}
                  >
                    {tour.difficulty}
                  </span>
                </div>

                {/* Quick Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="flex items-center justify-between text-white text-sm">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{tour.duration} days</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        <span>Max {tour.maxGroupSize}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span>
                          {tour.startLocation?.address?.split(",")[0] ||
                            "Various"}
                        </span>
                      </div>
                    </div>
                    <Eye className="h-4 w-4" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <CardContent className="p-5">
                {/* Rating */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "h-4 w-4",
                            i < Math.floor(tour.ratingAverage)
                              ? "fill-current"
                              : "fill-none text-gray-300 dark:text-gray-600",
                          )}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">
                      {tour.ratingAverage} ({tour.ratingQuantity})
                    </span>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-500">
                    {tour.difficulty}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {tour.name}
                </h3>

                {/* Summary */}
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                  {tour.summary}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800">
                  <div>
                    <span className="text-xs text-gray-500 dark:text-gray-500">
                      Starting from
                    </span>
                    <p className="text-lg font-bold text-primary-600 dark:text-primary-400">
                      {formatCurrency(tour.price)}
                      <span className="text-xs font-normal text-gray-500 dark:text-gray-500">
                        {" "}
                        / person
                      </span>
                    </p>
                  </div>
                  <Button
                    size="sm"
                    asChild
                    className="bg-primary-600 hover:bg-primary-700 text-white"
                  >
                    <Link to={`/tours/${tour._id}`}>Book Now</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
