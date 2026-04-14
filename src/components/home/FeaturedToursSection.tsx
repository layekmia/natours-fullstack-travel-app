import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toursAPI } from "@/api/tours";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, Star, Clock, Users } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export const FeaturedToursSection = () => {
  const { data: topTours, isLoading } = useQuery({
    queryKey: ["top-tours"],
    queryFn: () => toursAPI.getTopTours(),
  });

  const featuredTours = topTours?.data || [];

  if (isLoading) {
    return (
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-48 bg-gray-200 rounded-t-lg" />
                <CardContent className="p-4">
                  <div className="h-4 bg-gray-200 rounded mb-2" />
                  <div className="h-3 bg-gray-200 rounded w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Featured Tours
            </h2>
            <p className="text-gray-600">Our most popular adventures</p>
          </div>
          <Button variant="ghost" asChild>
            <Link to="/tours" className="gap-2">
              View All
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredTours.slice(0, 3).map((tour) => (
            <Card
              key={tour._id}
              className="group overflow-hidden hover:shadow-xl transition-all duration-300 py-0"
            >
              <div className="relative overflow-hidden h-48">
                <img
                  src={tour.imageCover}
                  alt={tour.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-semibold text-primary-600">
                  ${tour.price}
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <div className="flex items-center gap-3 text-white text-sm">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{tour.duration} days</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      <span>Max {tour.maxGroupSize}</span>
                    </div>
                  </div>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex items-center gap-1 mb-2">
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
                    {tour.ratingAverage} ({tour.ratingQuantity} reviews)
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary-600 transition-colors">
                  {tour.name}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {tour.summary}
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    <span className="font-semibold text-primary-600">
                      {formatCurrency(tour.price)}
                    </span>
                    {" per person"}
                  </div>
                  <Button size="sm" asChild>
                    <Link to={`/tours/${tour._id}`}>View Details</Link>
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
