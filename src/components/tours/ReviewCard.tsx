import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Review } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Star, Trash2, Edit } from "lucide-react";
import { formatDate } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ReviewCardProps {
  review: Review;
  onDelete: (reviewId: string) => void;
  onEdit?: (review: Review) => void;
}

export const ReviewCard = ({ review, onDelete, onEdit }: ReviewCardProps) => {
  const { user } = useAuth();
  const [isDeleting, setIsDeleting] = useState(false);

  const isOwner = user?._id === review.user._id;
  const isAdmin = user?.role === "admin";

  const canModify = isOwner || isAdmin;

  const handleDelete = async () => {
    setIsDeleting(true);
    await onDelete(review._id);
    setIsDeleting(false);
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
      <div className="flex justify-between items-start">
        {/* User Info */}
        <div className="flex gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={review.user.photo} alt={review.user.name} />
            <AvatarFallback>
              {review.user.name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-gray-900">
                {review.user.name}
              </span>
              <div className="flex items-center gap-1">
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
            </div>
            <p className="text-sm text-gray-500 mt-1">
              {formatDate(review.createdAt)}
            </p>
            <p className="text-gray-700 mt-2">{review.review}</p>
          </div>
        </div>

        {/* Action Buttons */}
        {canModify && (
          <div className="flex gap-2">
            {onEdit && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(review)}
                className="h-8 w-8 p-0"
              >
                <Edit className="h-4 w-4" />
              </Button>
            )}

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Review</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete your review? This action
                    cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    {isDeleting ? "Deleting..." : "Delete"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}
      </div>
    </div>
  );
};
