import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Users,
  MapPin,
  Clock,
  Star,
  ChevronRight,
} from "lucide-react";
import { formatDate, formatCurrency } from "@/lib/utils";
import { Booking } from "@/types";

interface BookingCardProps {
  booking: Booking;
}

export const BookingCard = ({ booking }: BookingCardProps) => {
  const tour = booking.tour;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow group py-0">
      <div className="flex flex-col md:flex-row">
        {/* Tour Image */}
        <div className="md:w-48 h-48 md:h-auto relative overflow-hidden">
          <img
            src={tour.imageCover}
            alt={tour.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-md text-xs font-semibold">
            Confirmed
          </div>
        </div>

        {/* Booking Details */}
        <CardContent className="flex-1 p-5">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                {tour.name}
              </h3>

              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Booked on {formatDate(booking.createdAt)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{tour.duration} days</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>Max {tour.maxGroupSize} people</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{tour.startLocation.address}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-semibold">
                    {tour.ratingAverage}
                  </span>
                </div>
                <span className="text-sm text-gray-500">
                  ({tour.ratingQuantity} reviews)
                </span>
              </div>

              <p className="text-gray-600 text-sm line-clamp-2">
                {tour.summary}
              </p>
            </div>

            <div className="text-right">
              <div className="text-2xl font-bold text-primary-600">
                {formatCurrency(booking.price)}
              </div>
              <div className="text-sm text-gray-500">total paid</div>

              <Button asChild className="mt-3">
                <Link to={`/tours/${tour._id}`}>
                  View Details
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};
