import { adminAPI } from "@/api/admin";
import { toursAPI } from "@/api/tours";
import { TourForm } from "@/components/admin/TourForm";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AlertCircle,
  ArrowLeft,
  DollarSign,
  Edit3,
  Globe,
  Loader2,
  MapPin,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

export function EditTour() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Fetch tour data
  const { data, isLoading, error } = useQuery({
    queryKey: ["tour", id],
    queryFn: () => toursAPI.getTour(id!),
    enabled: !!id,
  });
  const { data: guideData } = useQuery({
    queryKey: ["guides"],
    queryFn: () => adminAPI.getAllGuides(),
  });

  const guides = guideData?.data || [];

  const tour = data?.data;

  const refetchTours = () => {
    queryClient.invalidateQueries({ queryKey: ["admin-tours"] });
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary-600" />
        <p className="text-gray-500 dark:text-gray-400">
          Loading tour details...
        </p>
      </div>
    );
  }

  if (error || !tour) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
            <AlertCircle className="h-10 w-10 text-red-600 dark:text-red-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Tour Not Found
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            The tour you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => navigate("/admin/tours")} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Tours
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/admin/tours")}
              className="gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Tours
            </Button>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2.5 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl shadow-lg">
                  <Edit3 className="h-6 w-6 text-white" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
                  Edit Tour
                </h1>
              </div>
              <p className="text-gray-500 dark:text-gray-400 ml-14">
                Update tour information for{" "}
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  {tour.name}
                </span>
              </p>
            </div>

            {/* Quick Info Preview */}
            <div className="flex gap-3 ml-14 md:ml-0">
              <div className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                <DollarSign className="h-4 w-4 text-green-500" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  ${tour.price}
                </span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                <MapPin className="h-4 w-4 text-primary-500" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {tour.duration} days
                </span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                <Globe className="h-4 w-4 text-blue-500" />
                <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                  {tour.difficulty}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section - 2/3 width */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg overflow-hidden bg-white dark:bg-gray-900">
              <CardHeader className="bg-gradient-to-r from-white to-gray-50 dark:from-gray-900 dark:to-gray-800/50 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-6 bg-gradient-to-b from-primary-500 to-primary-700 rounded-full" />
                  <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                    Tour Information
                  </CardTitle>
                </div>
                <CardDescription className="text-gray-500 dark:text-gray-400 mt-2">
                  Update the details below. Changes will be reflected
                  immediately on the website.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <TourForm
                  initialData={tour}
                  availableGuides={guides}
                  onSuccess={refetchTours}
                />
              </CardContent>
            </Card>
          </div>

          {/* Tips Sidebar - 1/3 width */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Tips Card */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-2xl p-6 border border-blue-100 dark:border-blue-800">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Edit3 className="h-5 w-5 text-blue-500" />
                  Editing Tips
                </h3>
                <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex gap-2">
                    <span className="text-blue-500">•</span>
                    Update tour details carefully to keep information accurate
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-500">•</span>
                    New images will replace existing ones automatically
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-500">•</span>
                    Changes are saved to the database immediately
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-500">•</span>
                    Updated tours will appear on the website right away
                  </li>
                </ul>
              </div>

              {/* Current Tour Stats */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Globe className="h-5 w-5 text-green-500" />
                  Current Stats
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-800">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Rating
                    </span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {tour.ratingAverage} / 5 ({tour.ratingQuantity} reviews)
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-800">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Bookings
                    </span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {tour.bookingCount || 0} bookings
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Created
                    </span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {new Date(tour.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Price Warning */}
              {tour.priceDiscount && tour.priceDiscount > 0 && (
                <div className="bg-amber-50 dark:bg-amber-950/30 rounded-2xl p-4 border border-amber-200 dark:border-amber-800">
                  <div className="flex items-start gap-3">
                    <DollarSign className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-semibold text-amber-800 dark:text-amber-300">
                        Discounted Price
                      </h4>
                      <p className="text-xs text-amber-700 dark:text-amber-400 mt-1">
                        Current discount: ${tour.price - tour.priceDiscount} off
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Last Updated Info */}
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-4 text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Last updated: {new Date(tour.updatedAt).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
