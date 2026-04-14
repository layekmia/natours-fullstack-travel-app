import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TourSortProps {
  sortBy: string;
  onSortChange: (value: string) => void;
}

const sortOptions = [
  { value: "-price", label: "Price: High to Low" },
  { value: "price", label: "Price: Low to High" },
  { value: "-ratingAverage", label: "Rating: Highest" },
  { value: "ratingAverage", label: "Rating: Lowest" },
  { value: "-createdAt", label: "Newest First" },
  { value: "duration", label: "Duration: Shortest" },
  { value: "-duration", label: "Duration: Longest" },
];

export const TourSort = ({ sortBy, onSortChange }: TourSortProps) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-600">Sort by:</span>
      <Select value={sortBy} onValueChange={onSortChange}>
        <SelectTrigger className="w-[200px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
