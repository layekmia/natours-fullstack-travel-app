import { Star } from "lucide-react";

interface RatingProps {
  rating: number; // e.g. 4.3
}

export function Rating({ rating }: RatingProps) {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => {
        const fillPercentage = Math.min(Math.max(rating - i, 0), 1) * 100;

        return (
          <div key={i} className="relative">
            <Star className="h-4 w-4 text-gray-300" />

            <div
              className="absolute top-0 left-0 overflow-hidden"
              style={{ width: `${fillPercentage}%` }}
            >
              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
