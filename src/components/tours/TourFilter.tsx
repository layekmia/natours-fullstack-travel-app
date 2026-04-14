import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface TourFiltersProps {
  filters: {
    difficulty: string[];
    priceRange: number[];
    rating: number;
    duration: number[];
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onFilterChange: (key: string, value: any) => void;
  onClearFilters: () => void;
}

const difficulties = [
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "difficult", label: "Difficult" },
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
    <Card className="sticky top-24">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Filters</CardTitle>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-xs"
          >
            <X className="h-3 w-3 mr-1" />
            Clear all
          </Button>
        )}
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Difficulty */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold">Difficulty</Label>
          <div className="space-y-2">
            {difficulties.map((diff) => (
              <div key={diff.value} className="flex items-center space-x-2">
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
                />
                <Label
                  htmlFor={diff.value}
                  className="text-sm font-normal cursor-pointer"
                >
                  {diff.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold">
            Price Range (${filters.priceRange[0]} - ${filters.priceRange[1]})
          </Label>
          <Slider
            min={0}
            max={2000}
            step={50}
            value={filters.priceRange}
            onValueChange={(value) => onFilterChange("priceRange", value)}
            className="mt-2"
          />
        </div>

        {/* Duration */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold">
            Duration ({filters.duration[0]} - {filters.duration[1]} days)
          </Label>
          <Slider
            min={0}
            max={30}
            step={1}
            value={filters.duration}
            onValueChange={(value) => onFilterChange("duration", value)}
          />
        </div>

        {/* Rating Filter */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold">Minimum Rating</Label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Button
                key={star}
                variant={filters.rating === star ? "default" : "outline"}
                size="sm"
                onClick={() =>
                  onFilterChange("rating", star === filters.rating ? 0 : star)
                }
                className="flex-1"
              >
                {star}+
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
