import { reviewsAPI } from "@/api/reviews";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAuth } from "@/context/AuthContext";
import { Review } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MessageCircle, Star } from "lucide-react";
import { useState } from "react";
import { ReviewCard } from "./ReviewCard";
import { ReviewForm } from "./ReviewForm";

interface TourReviewsProps {
  tourId: string;
}

export const TourReviews = ({ tourId }: TourReviewsProps) => {
  const { isAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);

  // Fetch reviews
  const { data, isLoading } = useQuery({
    queryKey: ["reviews", tourId],
    queryFn: () => reviewsAPI.getTourReviews(tourId),
    enabled: !!tourId,
  });

  const reviews = data?.data || [];

  // Calculate average rating
  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length
        ).toFixed(1)
      : "0";

  // Create review mutation
  const createMutation = useMutation({
    mutationFn: (data: { review: string; rating: number }) =>
      reviewsAPI.createReview(tourId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", tourId] });
      queryClient.invalidateQueries({ queryKey: ["tour", tourId] });
      setIsDialogOpen(false);
    },
  });

  // Update review mutation
  const updateMutation = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: { review: string; rating: number };
    }) => reviewsAPI.updateReview(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", tourId] });
      queryClient.invalidateQueries({ queryKey: ["tour", tourId] });
      setEditingReview(null);
      setIsDialogOpen(false);
    },
  });

  // Delete review mutation
  const deleteMutation = useMutation({
    mutationFn: (reviewId: string) => reviewsAPI.deleteReview(reviewId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", tourId] });
      queryClient.invalidateQueries({ queryKey: ["tour", tourId] });
    },
  });

  const handleSubmitReview = async (data: {
    review: string;
    rating: number;
  }) => {
    if (editingReview) {
      await updateMutation.mutateAsync({ id: editingReview._id, data });
    } else {
      await createMutation.mutateAsync(data);
    }
  };

  const handleDeleteReview = async (reviewId: string) => {
    await deleteMutation.mutateAsync(reviewId);
  };

  const handleEditReview = (review: Review) => {
    setEditingReview(review);
    setIsDialogOpen(true);
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Reviews</h2>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex items-center gap-1">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold text-lg">{averageRating}</span>
            </div>
            <span className="text-gray-500">
              ({reviews.length} {reviews.length === 1 ? "review" : "reviews"})
            </span>
          </div>
        </div>

        {/* Write Review Button */}
        {isAuthenticated && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setEditingReview(null)}>
                <MessageCircle className="h-4 w-4 mr-2" />
                Write a Review
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>
                  {editingReview ? "Edit Your Review" : "Write a Review"}
                </DialogTitle>
              </DialogHeader>
              <ReviewForm
                onSubmit={handleSubmitReview}
                isSubmitting={
                  createMutation.isPending || updateMutation.isPending
                }
                initialData={
                  editingReview
                    ? {
                        rating: editingReview.rating,
                        review: editingReview.review,
                      }
                    : undefined
                }
              />
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Reviews List */}
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="flex gap-3">
                <div className="h-10 w-10 bg-gray-200 rounded-full" />
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-32 mb-2" />
                  <div className="h-3 bg-gray-200 rounded w-24 mb-3" />
                  <div className="h-16 bg-gray-200 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-8">
          <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-gray-900">
            No reviews yet
          </h3>
          <p className="text-gray-500 mt-1">
            Be the first to share your experience!
          </p>
          {isAuthenticated && (
            <Button
              variant="outline"
              onClick={() => setIsDialogOpen(true)}
              className="mt-4"
            >
              Write a Review
            </Button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <ReviewCard
              key={review._id}
              review={review}
              onDelete={handleDeleteReview}
              onEdit={handleEditReview}
            />
          ))}
        </div>
      )}
    </div>
  );
};
