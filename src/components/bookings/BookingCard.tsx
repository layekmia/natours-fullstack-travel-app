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
  CheckCircle,
} from "lucide-react";
import { formatDate, formatCurrency } from "@/lib/utils";
import { Booking } from "@/types";
import { cn } from "@/lib/utils";

interface BookingCardProps {
  booking: Booking;
  index?: number;
}

export const BookingCard = ({ booking, index = 0 }: BookingCardProps) => {
  const tour = booking.tour;

  return (
    <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-500 border-0 py-0 bg-white dark:bg-gray-900 rounded-2xl animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
      <div className="flex flex-col md:flex-row">
        {/* Tour Image */}
        <div className="relative md:w-56 h-56 md:h-auto overflow-hidden">
          <img
            src={tour.imageCover}
            alt={tour.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute top-3 right-3 bg-green-500 text-white px-2.5 py-1 rounded-lg text-xs font-semibold shadow-lg flex items-center gap-1">
            <CheckCircle className="h-3 w-3" />
            Confirmed
          </div>
        </div>

        {/* Booking Details */}
        <CardContent className="flex-1 p-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="space-y-3 flex-1">
              {/* Tour Name */}
              <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                {tour.name}
              </h3>

              {/* Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
                  <Calendar className="h-4 w-4 text-primary-500" />
                  <span>{formatDate(booking.createdAt)}</span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
                  <Clock className="h-4 w-4 text-primary-500" />
                  <span>{tour.duration} days</span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
                  <Users className="h-4 w-4 text-primary-500" />
                  <span>Max {tour.maxGroupSize}</span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
                  <MapPin className="h-4 w-4 text-primary-500" />
                  <span className="truncate">{tour.startLocation?.address?.split(',')[0] || 'Various'}</span>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-3.5 w-3.5",
                        i < Math.floor(tour.ratingAverage)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300 dark:text-gray-600"
                      )}
                    />
                  ))}
                </div>
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  {tour.ratingAverage}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-500">
                  ({tour.ratingQuantity} reviews)
                </span>
              </div>

              {/* Summary */}
              <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 leading-relaxed">
                {tour.summary}
              </p>
            </div>

            {/* Price & Action */}
            <div className="text-right shrink-0">
              <div className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/30 dark:to-primary-800/30 rounded-2xl px-5 py-3">
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Total Paid</p>
                <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  {formatCurrency(booking.price)}
                </p>
              </div>
              <Button 
                asChild 
                className="mt-4 bg-primary-600 hover:bg-primary-700 text-white shadow-md hover:shadow-lg transition-all group/btn"
              >
                <Link to={`/tours/${tour._id}`}>
                  View Details
                  <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};