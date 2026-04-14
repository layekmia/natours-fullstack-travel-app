import { reviewsAPI } from "@/api/reviews";
import { ReviewForm } from "@/components/tours/ReviewForm";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/context/AuthContext";
import { formatDate } from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AlertCircle, Edit, Eye, Star, Trash2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export const MyReviews = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [editingReview, setEditingReview] = useState<any>(null);
  const [deletingReviewId, setDeletingReviewId] = useState<string | null>(null);

  // Fetch user's reviews
  const { data, isLoading, error } = useQuery({
    queryKey: ["my-reviews"],
    queryFn: () => reviewsAPI.getMyReviews(),
    enabled: !!user,
  });

  const reviews = data?.data || [];

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (reviewId: string) => reviewsAPI.deleteReview(reviewId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-reviews"] });
      setDeletingReviewId(null);
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: { review: string; rating: number };
    }) => reviewsAPI.updateReview(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-reviews"] });
      setEditingReview(null);
    },
  });

  const handleDelete = (reviewId: string) => {
    deleteMutation.mutate(reviewId);
  };

  const handleUpdate = async (data: { review: string; rating: number }) => {
    if (editingReview) {
      await updateMutation.mutateAsync({
        id: editingReview._id,
        data,
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-8">
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-64" />
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-16 w-full" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Failed to load your reviews. Please try again later.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            My Reviews
          </h1>
          <p className="text-gray-600">
            Manage all your tour reviews in one place
          </p>
        </div>

        {/* Stats Card */}
        {reviews.length > 0 && (
          <Card className="mb-8 bg-gradient-to-r from-primary-50 to-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <p className="text-sm text-gray-600">Total Reviews</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {reviews.length}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Average Rating</p>
                  <div className="flex items-center gap-1">
                    <span className="text-3xl font-bold text-gray-900">
                      {(
                        reviews.reduce((acc, r) => acc + r.rating, 0) /
                        reviews.length
                      ).toFixed(1)}
                    </span>
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Most Recent</p>
                  <p className="text-sm font-medium text-gray-900">
                    {reviews[0] ? formatDate(reviews[0].createdAt) : "N/A"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Reviews List */}
        {reviews.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
                <Star className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No Reviews Yet
              </h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                You haven't written any reviews yet. Share your experience with
                other travelers!
              </p>
              <Button asChild>
                <Link to="/tours">Browse Tours</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <Card
                key={review._id}
                className="hover:shadow-md transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    {/* Tour Image */}
                    <div className="hidden sm:block w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={review.tour?.imageCover}
                        alt={review.tour?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Review Content */}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <Link
                            to={`/tours/${review.tour?._id}`}
                            className="text-lg font-semibold text-gray-900 hover:text-primary-600 transition-colors"
                          >
                            {review.tour?.name}
                          </Link>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex items-center gap-0.5">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-500">
                              {formatDate(review.createdAt)}
                            </span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEditingReview(review)}
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => setDeletingReviewId(review._id)}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Delete
                          </Button>
                          <Button variant="ghost" size="sm" asChild>
                            <Link to={`/tours/${review.tour?._id}`}>
                              <Eye className="h-4 w-4 mr-1" />
                              View Tour
                            </Link>
                          </Button>
                        </div>
                      </div>

                      {/* Review Text */}
                      <p className="text-gray-700 mt-3">{review.review}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Edit Review Dialog */}
      <Dialog
        open={!!editingReview}
        onOpenChange={() => setEditingReview(null)}
      >
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Your Review</DialogTitle>
          </DialogHeader>
          {editingReview && (
            <ReviewForm
              onSubmit={handleUpdate}
              isSubmitting={updateMutation.isPending}
              initialData={{
                rating: editingReview.rating,
                review: editingReview.review,
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!deletingReviewId}
        onOpenChange={() => setDeletingReviewId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Review</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this review? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deletingReviewId && handleDelete(deletingReviewId)}
              className="bg-red-600 hover:bg-red-700"
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
