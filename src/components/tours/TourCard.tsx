import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Clock, Users, MapPin } from "lucide-react";
import { Tour } from "@/types";
import { formatCurrency } from "@/lib/utils";

interface TourCardProps {
  tour: Tour;
}

export function TourCard({ tour }: TourCardProps) {
  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
      {/* Image Container */}
      <div className="relative overflow-hidden h-56">
        <img
          src={tour.imageCover}
          alt={tour.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Price Badge */}
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 text-sm font-bold text-primary-600 shadow-lg">
          {formatCurrency(tour.price)}
        </div>

        {/* Difficulty Badge */}
        <div className="absolute bottom-4 left-4">
          <span
            className={`
            px-3 py-1 rounded-full text-xs font-semibold uppercase
            ${tour.difficulty === "easy" && "bg-green-500 text-white"}
            ${tour.difficulty === "medium" && "bg-yellow-500 text-white"}
            ${tour.difficulty === "difficult" && "bg-red-500 text-white"}
          `}
          >
            {tour.difficulty}
          </span>
        </div>
      </div>

      <CardContent className="p-5 flex-1 flex flex-col">
        {/* Rating */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(tour.ratingAverage)
                      ? "fill-current"
                      : "fill-none"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600 ml-1">
              {tour.ratingAverage} ({tour.ratingQuantity})
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-600 transition-colors line-clamp-1">
          {tour.name}
        </h3>

        {/* Summary */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {tour.summary}
        </p>

        {/* Tour Details */}
        <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{tour.duration} days</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>Max {tour.maxGroupSize}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span className="line-clamp-1">{tour.startLocation.address}</span>
          </div>
        </div>

        {/* Button */}
        <Button asChild className="mt-auto w-full">
          <Link to={`/tours/${tour._id}`}>View Details</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
