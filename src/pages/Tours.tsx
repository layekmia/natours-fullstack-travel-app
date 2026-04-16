import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { toursAPI } from "@/api/tours";
import { TourCard } from "@/components/tours/TourCard";
import { TourSkeleton } from "@/components/tours/TourSkeleton";
import { TourFilters } from "@/components/tours/TourFilter";
import { TourSort } from "@/components/tours/TourSort";
import { TourSearch } from "@/components/tours/TourSearch";
import { Button } from "@/components/ui/button";
import { Filter, ChevronLeft, ChevronRight, Compass } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export default function Tours() {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sortBy, setSortBy] = useState("-createdAt");
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    difficulty: [] as string[],
    priceRange: [0, 2000],
    rating: 0,
    duration: [0, 30],
  });

  // Build query params
  const buildQueryParams = () => {
    const params: any = {
      page: currentPage,
      limit: 9,
      sort: sortBy,
    };
    if (debouncedSearch) {
      params.search = debouncedSearch;
    }

    if (filters.difficulty.length > 0) {
      params.difficulty = filters.difficulty.join(",");
    }

    if (filters.priceRange[0]! > 0) {
      params["price[gte]"] = filters.priceRange[0];
    }
    if (filters.priceRange[1]! < 2000) {
      params["price[lte]"] = filters.priceRange[1];
    }

    if (filters.duration[0]! > 0) {
      params["duration[gte]"] = filters.duration[0];
    }
    if (filters.duration[1]! < 30) {
      params["duration[lte]"] = filters.duration[1];
    }

    if (filters.rating > 0) {
      params["ratingAverage[gte]"] = filters.rating;
    }

    return params;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["tours", currentPage, sortBy, debouncedSearch, filters],
    queryFn: () => toursAPI.getAllTours(buildQueryParams()),
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const tours = data?.data || [];
  const totalResults = data?.results || 0;
  const totalPages = Math.ceil(totalResults / 9);

  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({
      difficulty: [],
      priceRange: [0, 2000],
      rating: 0,
      duration: [0, 30],
    });
    setSearchQuery("");
    setSortBy("-createdAt");
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Header with Gradient */}
        <div className="mb-10 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 text-sm font-medium mb-4">
            <Compass className="h-3 w-3" />
            <span>Explore Destinations</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent mb-3">
            All Tours
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto md:mx-0">
            Discover our collection of amazing adventures around the world
          </p>
        </div>

        {/* Search and Sort Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <TourSearch
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
          </div>
          <div className="flex gap-3">
            {/* Mobile Filter Button */}
            <Sheet
              open={isMobileFilterOpen}
              onOpenChange={setIsMobileFilterOpen}
            >
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  className="md:hidden gap-2 dark:border-gray-700 dark:bg-gray-900"
                >
                  <Filter className="h-4 w-4" />
                  Filters
                  {Object.values(filters).some((v) =>
                    Array.isArray(v)
                      ? v.length > 0 &&
                        !(
                          (v[0] === 0 && v[1] === 2000) ||
                          (v[0] === 0 && v[1] === 30)
                        )
                      : v !== 0,
                  ) && <span className="w-2 h-2 rounded-full bg-primary-500" />}
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-[300px] overflow-y-auto dark:bg-gray-950 dark:border-gray-800"
              >
                <TourFilters
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onClearFilters={clearFilters}
                />
              </SheetContent>
            </Sheet>

            {/* Sort */}
            <TourSort sortBy={sortBy} onSortChange={setSortBy} />
          </div>
        </div>

        <div className="flex gap-6">
          {/* Desktop Filters Sidebar */}
          <div className="hidden md:block w-72 shrink-0">
            <TourFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={clearFilters}
            />
          </div>

          <div className="flex-1">
            {/* Results count with active filters indicator */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Showing{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                  {tours.length}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                  {totalResults}
                </span>{" "}
                tours
              </p>

              {/* Active Filters Chips - Desktop */}
              <div className="hidden md:flex flex-wrap gap-2">
                {filters.difficulty.map((d) => (
                  <span
                    key={d}
                    className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>

            {/* Loading State */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <TourSkeleton key={i} />
                ))}
              </div>
            ) : tours.length === 0 ? (
              /* Empty State */
              <div className="text-center py-16">
                <div className="text-7xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  No tours found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Try adjusting your filters or search criteria
                </p>
                <Button onClick={clearFilters} variant="outline">
                  Clear all filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {tours.map((tour) => (
                  <TourCard key={tour._id} tour={tour} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-10">
                <div className="flex gap-1.5">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="dark:border-gray-700"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>

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
                        variant={
                          currentPage === pageNum ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => setCurrentPage(pageNum)}
                        className={cn(
                          "w-9",
                          currentPage === pageNum
                            ? "bg-primary-600 hover:bg-primary-700"
                            : "dark:border-gray-700",
                        )}
                      >
                        {pageNum}
                      </Button>
                    );
                  })}

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="dark:border-gray-700"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
