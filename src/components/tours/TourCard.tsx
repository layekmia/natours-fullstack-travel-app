import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { Tour } from "@/types";
import { Clock, MapPin, Users, Eye, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface TourCardProps {
  tour: Tour;
}

export function TourCard({ tour }: TourCardProps) {
  const difficultyColors = {
    easy: "bg-green-500/90 text-white",
    medium: "bg-yellow-500/90 text-white",
    difficult: "bg-red-500/90 text-white",
  };

  return (
    <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-500 h-full flex flex-col py-0 border-0 dark:bg-gray-900/50 backdrop-blur-sm hover:-translate-y-2">
      {/* Image Container */}
      <div className="relative overflow-hidden h-56">
        <img
          src={tour.imageCover}
          alt={tour.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Dark Overlay on Hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />

        {/* Price Badge */}
        <div className="absolute top-4 right-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-full px-3 py-1.5 text-sm font-bold text-primary-600 dark:text-primary-400 shadow-lg">
          {formatCurrency(tour.price)}
        </div>

        {/* Difficulty Badge */}
        <div className="absolute bottom-4 left-4">
          <span
            className={cn(
              "px-3 py-1 rounded-full text-xs font-semibold uppercase shadow-lg",
              difficultyColors[tour.difficulty],
            )}
          >
            {tour.difficulty}
          </span>
        </div>

        {/* Quick View Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/50">
          <div className="flex items-center gap-2 text-white">
            <Eye className="h-5 w-5" />
            <span className="text-sm font-medium">Quick View</span>
          </div>
        </div>
      </div>

      <CardContent className="p-5 flex-1 flex flex-col">
        {/* Rating Section */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-3.5 w-3.5",
                    i < Math.floor(tour.ratingAverage)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300 dark:text-gray-600",
                  )}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {tour.ratingAverage}{" "}
              <span className="text-xs">({tour.ratingQuantity})</span>
            </span>
          </div>

          {/* Duration Badge */}
          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-500">
            <Clock className="h-3 w-3" />
            <span>{tour.duration} days</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          {tour.name}
        </h3>

        {/* Summary */}
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed">
          {tour.summary}
        </p>

        {/* Tour Details */}
        <div className="mb-2 text-sm flex items-center gap-3">
          <div className="flex items-center gap-4 ">
            <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-500">
              <Users className="h-3.5 w-3.5" />
              <span>Max {tour.maxGroupSize}</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-500">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate text-sm">
              {tour.startLocation?.address?.split(",")[0] ||
                "Various locations"}
            </span>
          </div>
        </div>


        {/* Footer */}
        <div className="flex items-center justify-between mt-auto">
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
            className="bg-primary-600 hover:bg-primary-700 text-white shadow-md hover:shadow-lg transition-all"
          >
            <Link to={`/tours/${tour._id}`}>Book Now</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
