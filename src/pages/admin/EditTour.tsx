import { adminAPI } from "@/api/admin";
import { toursAPI } from "@/api/tours";
import { TourForm } from "@/components/admin/TourForm";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AlertCircle, ArrowLeft, Loader2 } from "lucide-react";
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
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
      </div>
    );
  }

  if (error || !tour) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/admin/tours")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </div>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>Tour not found or failed to load.</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/admin/tours")}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Tour</h1>
          <p className="text-gray-600 mt-1">
            Update tour information for {tour.name}
          </p>
        </div>
      </div>

      {/* Form Card */}
      <Card>
        <CardHeader>
          <CardTitle>Tour Information</CardTitle>
          <CardDescription>
            Update the details below. Changes will be reflected immediately on
            the website.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TourForm
            initialData={tour}
            availableGuides={guides}
            onSuccess={refetchTours}
          />
        </CardContent>
      </Card>
    </div>
  );
}
