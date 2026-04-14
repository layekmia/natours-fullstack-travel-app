import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toursAPI } from "@/api/tours";
import { TourForm } from "@/components/admin/TourForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CreateTour() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (formData: FormData) => toursAPI.createTour(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-tours"] });
      navigate("/admin/tours");
    },
    onError: (error: any) => {
      console.error("Failed to create tour:", error);
    },
  });

  const handleSubmit = async (formData: FormData) => {
    await createMutation.mutateAsync(formData);
  };

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
          <h1 className="text-3xl font-bold text-gray-900">Create New Tour</h1>
          <p className="text-gray-600 mt-1">
            Add a new adventure to your collection
          </p>
        </div>
      </div>

      {/* Form Card */}
      <Card>
        <CardHeader>
          <CardTitle>Tour Information</CardTitle>
          <CardDescription>
            Fill in the details below to create a new tour. All fields marked
            with * are required.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TourForm
            onSubmit={handleSubmit}
            isSubmitting={createMutation.isPending}
          />
        </CardContent>
      </Card>
    </div>
  );
}
