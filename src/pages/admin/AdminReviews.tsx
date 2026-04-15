import { adminAPI } from "@/api/admin";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Review } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  MessageCircle,
  MoreHorizontal,
  Search,
  Star,
  Trash2,
  TrendingUp,
  Users,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export const AdminReviews = () => {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteReviewId, setDeleteReviewId] = useState<string | null>(null);
  const itemsPerPage = 10;

  // Fetch reviews
  const { data, isLoading } = useQuery({
    queryKey: ["admin-reviews", currentPage, searchQuery],
    queryFn: () =>
      adminAPI.getAllReviews({
        page: currentPage,
        limit: itemsPerPage,
        search: searchQuery || undefined,
      }),
  });

  // Delete review mutation
  const deleteMutation = useMutation({
    mutationFn: (id: string) => adminAPI.deleteReview(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-reviews"] });
      queryClient.invalidateQueries({ queryKey: ["admin-tours"] });
      toast.success("Review deleted successfully");
      setDeleteReviewId(null);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to delete review");
    },
  });

  const reviews = data?.data || [];
  const totalResults = data?.results || 0;
  const totalPages = Math.ceil(totalResults / itemsPerPage);

  const handleDelete = () => {
    if (deleteReviewId) {
      deleteMutation.mutate(deleteReviewId);
    }
  };

  // Calculate stats
  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum: number, r: any) => sum + r.rating, 0) /
          reviews.length
        ).toFixed(1)
      : "0";
  const uniqueUsers = new Set(reviews.map((r: any) => r.user?._id)).size;
  const uniqueTours = new Set(reviews.map((r: any) => r.tour?._id)).size;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">All Reviews</h1>
        <p className="text-gray-600 mt-1">
          Manage user reviews across all tours
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Reviews</p>
              <p className="text-2xl font-bold">{totalResults}</p>
            </div>
            <MessageCircle className="h-8 w-8 text-blue-400" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Average Rating</p>
              <div className="flex items-center gap-1">
                <p className="text-2xl font-bold text-yellow-600">
                  {averageRating}
                </p>
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              </div>
            </div>
            <Star className="h-8 w-8 text-yellow-400" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Unique Users</p>
              <p className="text-2xl font-bold text-purple-600">
                {uniqueUsers}
              </p>
            </div>
            <Users className="h-8 w-8 text-purple-400" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Tours Reviewed</p>
              <p className="text-2xl font-bold text-green-600">{uniqueTours}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-400" />
          </CardContent>
        </Card>
      </div>

      {/* Search Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by tour name, user name, or review content..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Reviews Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tour</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Review</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : reviews.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    No reviews found
                  </TableCell>
                </TableRow>
              ) : (
                reviews.map((review: Review) => (
                  <TableRow key={review._id}>
                    <TableCell className="font-medium">
                      <Link
                        to={`/tours/${review.tour?._id}`}
                        className="hover:text-primary-600 hover:underline"
                      >
                        {review.tour?.name || "Deleted Tour"}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={review.user?.photo} />
                          <AvatarFallback>
                            {review.user?.name?.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{review.user?.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="max-w-xs truncate">{review.review}</p>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{review.rating}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {new Date(review.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem asChild>
                            <Link to={`/tours/${review.tour}`}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Tour
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => setDeleteReviewId(review._id)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete Review
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between flex-wrap gap-4">
          <p className="text-sm text-gray-600">
            Showing {reviews.length} of {totalResults} reviews
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <div className="flex gap-1">
              {[...Array(Math.min(5, totalPages))].map((_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                return (
                  <Button
                    key={i}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(pageNum)}
                    className="w-10"
                  >
                    {pageNum}
                  </Button>
                );
              })}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!deleteReviewId}
        onOpenChange={() => setDeleteReviewId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Review</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this review? This action cannot be
              undone. The tour's average rating will be recalculated
              automatically.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
