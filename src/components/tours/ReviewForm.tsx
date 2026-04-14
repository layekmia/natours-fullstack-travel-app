import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ReviewFormData } from "@/schemas/reviewSchema";
import { Star } from "lucide-react";
import { useState } from "react";

interface ReviewFormProps {
  onSubmit: (data: ReviewFormData) => Promise<void>;
  isSubmitting?: boolean;
  initialData?: ReviewFormData;
}

export const ReviewForm = ({
  onSubmit,
  isSubmitting = false,
  initialData,
}: ReviewFormProps) => {
  const [hoveredRating, setHoveredRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(
    initialData?.rating || 0,
  );
  const [reviewText, setReviewText] = useState(initialData?.review || "");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (selectedRating === 0) {
      setError("Please select a rating");
      return;
    }

    if (reviewText.trim().length < 5) {
      setError("Review must be at least 5 characters");
      return;
    }

    await onSubmit({ rating: selectedRating, review: reviewText });

    // Reset form only if not editing
    if (!initialData) {
      setSelectedRating(0);
      setReviewText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Rating Stars */}
      <div>
        <Label className="mb-2 block">Your Rating *</Label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setSelectedRating(star)}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              className="focus:outline-none"
            >
              <Star
                className={`h-8 w-8 transition-colors ${
                  star <= (hoveredRating || selectedRating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Review Text */}
      <div>
        <Label htmlFor="review" className="mb-2 block">
          Your Review *
        </Label>
        <Textarea
          id="review"
          placeholder="Share your experience with this tour..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          rows={4}
          disabled={isSubmitting}
        />
        <p className="text-xs text-gray-500 mt-1">
          {reviewText.length}/500 characters
        </p>
      </div>

      {/* Error Message */}
      {error && <p className="text-sm text-red-600">{error}</p>}

      {/* Submit Button */}
      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting
          ? initialData
            ? "Updating..."
            : "Submitting..."
          : initialData
            ? "Update Review"
            : "Submit Review"}
      </Button>
    </form>
  );
};
