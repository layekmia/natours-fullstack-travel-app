import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toursAPI } from "@/api/tours";
import { TourForm } from "@/components/admin/TourForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

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

  const tour = data?.data;

  const updateMutation = useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: FormData }) =>
      toursAPI.updateTour(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-tours"] });
      queryClient.invalidateQueries({ queryKey: ["tour", id] });
      navigate("/admin/tours");
    },
    onError: (error: any) => {
      console.error("Failed to update tour:", error);
    },
  });

  const handleSubmit = async (formData: FormData) => {
    if (id) {
      await updateMutation.mutateAsync({ id, formData });
    }
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
            onSubmit={handleSubmit}
            isSubmitting={updateMutation.isPending}
          />
        </CardContent>
      </Card>
    </div>
  );
}
