import { adminAPI } from "@/api/admin";
import { TourForm } from "@/components/admin/TourForm";
import { Button } from "@/components/ui/button";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Clock, Mountain, Sparkles } from "lucide-react";
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/admin/tours")}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Tours
            </Button>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-primary-100 rounded-xl">
                  <Sparkles className="h-6 w-6 text-primary-600" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Create New Tour
                </h1>
              </div>
              <p className="text-gray-500 ml-14">
                Add an amazing adventure to your collection
              </p>
            </div>

            {/* Quick Stats Preview */}
            <div className="flex gap-3 ml-14 md:ml-0">
              <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg shadow-sm">
                <Mountain className="h-4 w-4 text-primary-500" />
                <span className="text-sm text-gray-600">New Adventure</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg shadow-sm">
                <Clock className="h-4 w-4 text-primary-500" />
                <span className="text-sm text-gray-600">Set Duration</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-white to-gray-50">
              <h2 className="text-lg font-semibold text-gray-900">
                Tour Details
              </h2>
              <p className="text-sm text-gray-500 mt-0.5">
                Fill in the information below to create your tour
              </p>
            </div>
            <div className="p-6">
              <TourForm availableGuides={guides} onSuccess={refetchTours} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
