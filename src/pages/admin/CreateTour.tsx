import { adminAPI } from "@/api/admin";
import { TourForm } from "@/components/admin/TourForm";
import { Button } from "@/components/ui/button";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Clock, Mountain, Sparkles, HelpCircle, Image, DollarSign, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function CreateTour() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const refetchTours = () => {
    queryClient.invalidateQueries({ queryKey: ["admin-tours"] });
  };

  const { data } = useQuery({
    queryKey: ["guides"],
    queryFn: () => adminAPI.getAllGuides(),
  });

  const guides = data?.data || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {/* Hero Header */}
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
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
                  Create New Tour
                </h1>
              </div>
              <p className="text-gray-500 dark:text-gray-400 ml-14">
                Add an amazing adventure to your collection
              </p>
            </div>

            {/* Quick Stats Preview */}
            <div className="flex gap-3 ml-14 md:ml-0">
              <div className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                <Mountain className="h-4 w-4 text-primary-500" />
                <span className="text-sm text-gray-600 dark:text-gray-400">New Adventure</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                <Clock className="h-4 w-4 text-primary-500" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Set Duration</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section - 2/3 width */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 bg-gradient-to-r from-white to-gray-50 dark:from-gray-900 dark:to-gray-800/50">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Tour Details
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                  Fill in the information below to create your tour
                </p>
              </div>
              <div className="p-6">
                <TourForm availableGuides={guides} onSuccess={refetchTours} />
              </div>
            </div>
          </div>

          {/* Tips Sidebar - 1/3 width */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Tips Card */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-2xl p-6 border border-blue-100 dark:border-blue-800">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-blue-500" />
                  Pro Tips
                </h3>
                <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex gap-2">
                    <span className="text-blue-500">•</span>
                    Use high-quality cover images (1920x1080 recommended)
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-500">•</span>
                    Keep tour names concise but descriptive (10-40 characters)
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-500">•</span>
                    Add multiple start dates for better availability
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-500">•</span>
                    Select experienced guides to enhance customer experience
                  </li>
                </ul>
              </div>

              {/* Requirements Card */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Image className="h-5 w-5 text-green-500" />
                  Requirements
                </h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Cover Image</span>
                    <span className="text-xs text-red-500 bg-red-50 dark:bg-red-950/30 px-2 py-0.5 rounded-full">Required</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Tour Name</span>
                    <span className="text-xs text-red-500 bg-red-50 dark:bg-red-950/30 px-2 py-0.5 rounded-full">Required</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Price</span>
                    <span className="text-xs text-red-500 bg-red-50 dark:bg-red-950/30 px-2 py-0.5 rounded-full">Required</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Description</span>
                    <span className="text-xs text-red-500 bg-red-50 dark:bg-red-950/30 px-2 py-0.5 rounded-full">Required</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Gallery Images</span>
                    <span className="text-xs text-green-500 bg-green-50 dark:bg-green-950/30 px-2 py-0.5 rounded-full">Optional</span>
                  </li>
                </ul>
              </div>

              {/* Quick Guide Card */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800/50 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Users className="h-5 w-5 text-purple-500" />
                  Quick Guide
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900/50 text-primary-600 dark:text-primary-400 flex items-center justify-center text-xs font-bold">1</div>
                    <span className="text-gray-600 dark:text-gray-400">Add basic info & pricing</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 flex items-center justify-center text-xs font-bold">2</div>
                    <span className="text-gray-600 dark:text-gray-400">Upload images</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 flex items-center justify-center text-xs font-bold">3</div>
                    <span className="text-gray-600 dark:text-gray-400">Set location & dates</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 flex items-center justify-center text-xs font-bold">4</div>
                    <span className="text-gray-600 dark:text-gray-400">Assign guides & publish</span>
                  </div>
                </div>
              </div>

              {/* Price Tip */}
              <div className="bg-amber-50 dark:bg-amber-950/30 rounded-2xl p-4 border border-amber-200 dark:border-amber-800">
                <div className="flex items-start gap-3">
                  <DollarSign className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-amber-800 dark:text-amber-300">Price Tip</h4>
                    <p className="text-xs text-amber-700 dark:text-amber-400 mt-1">
                      Set competitive pricing. Discount must be less than regular price.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}