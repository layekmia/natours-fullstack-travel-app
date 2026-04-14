import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { Tour } from "@/types";
import { Clock, MapPin, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Rating } from "./Rating";

interface TourCardProps {
  tour: Tour;
}

export function TourCard({ tour }: TourCardProps) {
  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col py-0">
      <div className="relative overflow-hidden h-56">
        <img
          src={tour.imageCover}
          alt={tour.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 text-sm font-bold text-primary-600 shadow-lg">
          {formatCurrency(tour.price)}
        </div>

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
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1">
            <Rating rating={tour.ratingAverage} />

            <span className="text-sm text-gray-600 ml-1">
              {tour.ratingAverage} ({tour.ratingQuantity})
            </span>
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-600 transition-colors line-clamp-1">
          {tour.name}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {tour.summary}
        </p>

        <div className="mb-4 text-sm text-gray-500">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 whitespace-nowrap">
              <Clock className="h-4 w-4" />
              <span>{tour.duration} days</span>
            </div>

            <div className="flex items-center gap-1 whitespace-nowrap">
              <Users className="h-4 w-4" />
              <span>Max {tour.maxGroupSize}</span>
            </div>
          </div>

          <div className="flex items-center gap-1 mt-2">
            <MapPin className="h-4 w-4 shrink-0" />
            <span className="truncate">
              {tour.startLocation?.address ?? "Unknown location"}
            </span>
          </div>
        </div>

        <Button asChild className="mt-auto w-full">
          <Link to={`/tours/${tour._id}`}>View Details</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
