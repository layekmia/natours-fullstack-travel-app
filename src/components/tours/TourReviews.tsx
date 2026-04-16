import { reviewsAPI } from "@/api/reviews";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/context/AuthContext";
import { Review } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MessageCircle, Quote, Star, ThumbsUp } from "lucide-react";
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

  // Calculate statistics
  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length
        ).toFixed(1)
      : "0";

  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => ({
    stars: rating,
    count: reviews.filter((r) => Math.floor(r.rating) === rating).length,
    percentage: reviews.length
      ? (reviews.filter((r) => Math.floor(r.rating) === rating).length /
          reviews.length) *
        100
      : 0,
  }));

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
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md border border-gray-100 dark:border-gray-800 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 bg-gradient-to-r from-white to-gray-50 dark:from-gray-900 dark:to-gray-800/50">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-primary-100 dark:bg-primary-900/50">
            <MessageCircle className="h-4 w-4 text-primary-600 dark:text-primary-400" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Traveler Reviews
          </h2>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 ml-7">
          What our adventurers say about this experience
        </p>
      </div>

      <div className="p-6">
        {/* Rating Summary Section */}
        {reviews.length > 0 && (
          <div className="flex flex-col md:flex-row gap-6 mb-8 pb-6 border-b border-gray-100 dark:border-gray-800">
            {/* Average Rating Display */}
            <div className="text-center md:text-left">
              <div className="text-5xl font-bold text-gray-900 dark:text-white">
                {averageRating}
              </div>
              <div className="flex items-center justify-center md:justify-start gap-1 mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(parseFloat(averageRating))
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300 dark:text-gray-600"
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Based on {reviews.length}{" "}
                {reviews.length === 1 ? "review" : "reviews"}
              </p>
            </div>

            {/* Rating Distribution Bars */}
            <div className="flex-1 space-y-2">
              {ratingDistribution.map((item) => (
                <div key={item.stars} className="flex items-center gap-3">
                  <div className="flex items-center gap-1 w-12">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {item.stars}
                    </span>
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  </div>
                  <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-400 rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <div className="w-10 text-right">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {item.count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Write Review Button - Enhanced */}
        {isAuthenticated && (
          <div className="mb-6">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  onClick={() => setEditingReview(null)}
                  className="w-full sm:w-auto bg-primary-600 hover:bg-primary-700 text-white gap-2 shadow-md hover:shadow-lg transition-all"
                >
                  <MessageCircle className="h-4 w-4" />
                  Share Your Experience
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px] rounded-2xl">
                <DialogHeader>
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-primary-100 dark:bg-primary-900/50">
                      <Quote className="h-4 w-4 text-primary-600 dark:text-primary-400" />
                    </div>
                    <DialogTitle className="text-xl font-bold">
                      {editingReview ? "Edit Your Review" : "Write a Review"}
                    </DialogTitle>
                  </div>
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
          </div>
        )}

        {/* Reviews List */}
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-16 w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/30 rounded-xl">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
              <MessageCircle className="h-8 w-8 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No reviews yet
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm max-w-sm mx-auto">
              Be the first to share your experience and help other travelers
            </p>
            {isAuthenticated && (
              <Button
                variant="outline"
                onClick={() => setIsDialogOpen(true)}
                className="mt-4 gap-2"
              >
                <Star className="h-4 w-4" />
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

        {/* Trust Badge */}
        {reviews.length > 0 && (
          <div className="mt-6 pt-4 flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-500">
            <ThumbsUp className="h-3 w-3" />
            <span>All reviews are from verified travelers</span>
          </div>
        )}
      </div>
    </div>
  );
};
