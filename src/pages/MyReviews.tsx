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
import {
  AlertCircle,
  Edit,
  Eye,
  Star,
  Trash2,
  Quote,
  TrendingUp,
  MessageCircle,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

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

  // Calculate stats
  const totalReviews = reviews.length;
  const averageRating =
    totalReviews > 0
      ? (reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(
          1,
        )
      : "0";
  const highestRated =
    reviews.length > 0 ? Math.max(...reviews.map((r) => r.rating)) : 0;

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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="mb-8">
            <Skeleton className="h-10 w-48 mb-3" />
            <Skeleton className="h-5 w-80" />
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="rounded-2xl border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <Skeleton className="h-14 w-14 rounded-full" />
                    <div className="flex-1 space-y-3">
                      <Skeleton className="h-5 w-48" />
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-20 w-full" />
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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          <Alert variant="destructive" className="rounded-2xl">
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="mb-10 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 text-sm font-medium mb-4">
            <MessageCircle className="h-3 w-3" />
            <span>Your Voice Matters</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent mb-3">
            My Reviews
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage all your tour reviews and share your experiences
          </p>
        </div>

        {/* Stats Cards */}
        {totalReviews > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            <div className="group bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-800">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    Total Reviews
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {totalReviews}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MessageCircle className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                </div>
              </div>
            </div>

            <div className="group bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-800">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    Average Rating
                  </p>
                  <div className="flex items-center gap-1">
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                      {averageRating}
                    </p>
                    <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                  </div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Star className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </div>
              </div>
            </div>

            <div className="group bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-800">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    Highest Rating
                  </p>
                  <div className="flex items-center gap-1">
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                      {highestRated}
                    </p>
                    <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                  </div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/50 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Reviews List */}
        {reviews.length === 0 ? (
          <Card className="rounded-2xl border-0 shadow-sm bg-white dark:bg-gray-900">
            <CardContent className="text-center py-16">
              <div className="relative inline-flex items-center justify-center mb-6">
                <div className="absolute inset-0 bg-primary-100 dark:bg-primary-900/30 rounded-full blur-2xl" />
                <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/50 dark:to-primary-800/50 flex items-center justify-center">
                  <Star className="h-12 w-12 text-primary-600 dark:text-primary-400" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                No Reviews Yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                You haven't written any reviews yet. Share your experience with
                other travelers!
              </p>
              <Button
                asChild
                size="lg"
                className="bg-primary-600 hover:bg-primary-700"
              >
                <Link to="/tours">Browse Tours</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-5">
            {reviews.map((review, index) => (
              <Card
                key={review._id}
                className="group hover:shadow-xl transition-all duration-500 border-0 bg-white dark:bg-gray-900 rounded-2xl overflow-hidden animate-fade-in-up py-0"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    {/* Tour Image */}
                    <div className="relative md:w-48 h-48 md:h-auto overflow-hidden">
                      <img
                        src={review.tour?.imageCover}
                        alt={review.tour?.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    {/* Review Content */}
                    <div className="flex-1 p-6">
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div className="flex-1">
                          {/* Tour Name */}
                          <Link
                            to={`/tours/${review.tour?._id}`}
                            className="text-xl font-bold text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors inline-flex items-center gap-2"
                          >
                            {review.tour?.name}
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                              />
                            </svg>
                          </Link>

                          {/* Rating & Date */}
                          <div className="flex flex-wrap items-center gap-3 mt-2">
                            <div className="flex items-center gap-0.5">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={cn(
                                    "h-4 w-4 transition-all",
                                    i < review.rating
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "text-gray-300 dark:text-gray-600",
                                  )}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                              <svg
                                className="w-3 h-3"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                              </svg>
                              {formatDate(review.createdAt)}
                            </span>
                          </div>

                          {/* Quote Icon */}
                          <div className="mt-4 relative">
                            <Quote className="absolute -top-2 -left-1 h-6 w-6 text-primary-200 dark:text-primary-800 opacity-50" />
                            <p className="text-gray-700 dark:text-gray-300 pl-6 leading-relaxed">
                              {review.review}
                            </p>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2 shrink-0">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEditingReview(review)}
                            className="gap-1.5 border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700"
                          >
                            <Edit className="h-3.5 w-3.5" />
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30 gap-1.5 border-red-200 dark:border-red-800"
                            onClick={() => setDeletingReviewId(review._id)}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            Delete
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            asChild
                            className="gap-1.5"
                          >
                            <Link to={`/tours/${review.tour?._id}`}>
                              <Eye className="h-3.5 w-3.5" />
                              View
                            </Link>
                          </Button>
                        </div>
                      </div>
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
        <DialogContent className="sm:max-w-[500px] rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              Edit Your Review
            </DialogTitle>
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
        <AlertDialogContent className="rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-bold">
              Delete Review
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this review? This action cannot be
              undone. This will also affect the tour's average rating.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deletingReviewId && handleDelete(deletingReviewId)}
              className="bg-red-600 hover:bg-red-700 rounded-xl"
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete Review"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
