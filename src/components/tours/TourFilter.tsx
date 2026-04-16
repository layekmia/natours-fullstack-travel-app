import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { X, FilterX, Mountain, DollarSign, Clock, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface TourFiltersProps {
  filters: {
    difficulty: string[];
    priceRange: number[];
    rating: number;
    duration: number[];
  };
  onFilterChange: (key: string, value: any) => void;
  onClearFilters: () => void;
}

const difficulties = [
  { value: "easy", label: "Easy", color: "text-green-600 dark:text-green-400" },
  {
    value: "medium",
    label: "Medium",
    color: "text-yellow-600 dark:text-yellow-400",
  },
  {
    value: "difficult",
    label: "Difficult",
    color: "text-red-600 dark:text-red-400",
  },
];

export const TourFilters = ({
  filters,
  onFilterChange,
  onClearFilters,
}: TourFiltersProps) => {
  const hasActiveFilters =
    filters.difficulty.length > 0 ||
    filters.priceRange[0]! > 0 ||
    filters.priceRange[1]! < 2000 ||
    filters.rating > 0 ||
    filters.duration[0]! > 0 ||
    filters.duration[1]! < 30;

  return (
    <Card className="sticky top-24 border-gray-200 dark:border-gray-800 shadow-sm dark:bg-gray-900/50 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <FilterX className="h-4 w-4 text-primary-500" />
          Filters
        </CardTitle>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-xs text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 gap-1"
          >
            <X className="h-3 w-3" />
            Clear all
          </Button>
        )}
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Difficulty Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Mountain className="h-4 w-4 text-primary-500" />
            <Label className="text-sm font-semibold text-gray-900 dark:text-white">
              Difficulty
            </Label>
          </div>
          <div className="space-y-2.5">
            {difficulties.map((diff) => (
              <div key={diff.value} className="flex items-center space-x-3">
                <Checkbox
                  id={diff.value}
                  checked={filters.difficulty.includes(diff.value)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      onFilterChange("difficulty", [
                        ...filters.difficulty,
                        diff.value,
                      ]);
                    } else {
                      onFilterChange(
                        "difficulty",
                        filters.difficulty.filter((d) => d !== diff.value),
                      );
                    }
                  }}
                  className="border-gray-300 dark:border-gray-600"
                />
                <Label
                  htmlFor={diff.value}
                  className={cn(
                    "text-sm font-normal cursor-pointer",
                    diff.color,
                  )}
                >
                  {diff.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Price Range Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-primary-500" />
            <Label className="text-sm font-semibold text-gray-900 dark:text-white">
              Price Range
            </Label>
          </div>
          <div className="px-1">
            <Slider
              min={0}
              max={2000}
              step={50}
              value={filters.priceRange}
              onValueChange={(value) => onFilterChange("priceRange", value)}
              className="mt-2"
            />
            <div className="flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
              <span>${filters.priceRange[0]}</span>
              <span>${filters.priceRange[1]}</span>
            </div>
          </div>
        </div>

        {/* Duration Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary-500" />
            <Label className="text-sm font-semibold text-gray-900 dark:text-white">
              Duration (days)
            </Label>
          </div>
          <div className="px-1">
            <Slider
              min={0}
              max={30}
              step={1}
              value={filters.duration}
              onValueChange={(value) => onFilterChange("duration", value)}
            />
            <div className="flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
              <span>{filters.duration[0]} days</span>
              <span>{filters.duration[1]} days</span>
            </div>
          </div>
        </div>

        {/* Rating Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-primary-500" />
            <Label className="text-sm font-semibold text-gray-900 dark:text-white">
              Minimum Rating
            </Label>
          </div>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Button
                key={star}
                variant={filters.rating === star ? "default" : "outline"}
                size="sm"
                onClick={() =>
                  onFilterChange("rating", star === filters.rating ? 0 : star)
                }
                className={cn(
                  "flex-1 transition-all",
                  filters.rating === star
                    ? "bg-primary-600 hover:bg-primary-700"
                    : "border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800",
                )}
              >
                {star}+
              </Button>
            ))}
          </div>
        </div>

        {/* Active Filters Summary */}
        {hasActiveFilters && (
          <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
              Active filters:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {filters.difficulty.map((d) => (
                <span
                  key={d}
                  className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                >
                  {d}
                </span>
              ))}
              {(filters.priceRange[0]! > 0 ||
                filters.priceRange[1]! < 2000) && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                  ${filters.priceRange[0]} - ${filters.priceRange[1]}
                </span>
              )}
              {filters.rating > 0 && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                  {filters.rating}+ stars
                </span>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
