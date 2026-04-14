import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { toursAPI } from "@/api/tours";
import { TourCard } from "@/components/tours/TourCard";
import { TourSkeleton } from "@/components/tours/TourSkeleton";
import { TourFilters } from "@/components/tours/TourFilter";
import { TourSort } from "@/components/tours/TourSort";
import { TourSearch } from "@/components/tours/TourSearch";
import { Button } from "@/components/ui/button";
import { Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Tours() {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
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

    if (searchQuery) {
      params.search = searchQuery;
    }

    if (filters.difficulty.length > 0) {
      params.difficulty = filters.difficulty.join(",");
    }

    if (filters.priceRange[0] > 0) {
      params["price[gte]"] = filters.priceRange[0];
    }
    if (filters.priceRange[1] < 2000) {
      params["price[lte]"] = filters.priceRange[1];
    }

    if (filters.duration[0] > 0) {
      params["duration[gte]"] = filters.duration[0];
    }
    if (filters.duration[1] < 30) {
      params["duration[lte]"] = filters.duration[1];
    }

    if (filters.rating > 0) {
      params["ratingAverage[gte]"] = filters.rating;
    }

    return params;
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["tours", buildQueryParams()],
    queryFn: () => toursAPI.getAllTours(buildQueryParams()),
  });

  useEffect(() => {
    refetch();
  }, [currentPage, sortBy, searchQuery, filters, refetch]);

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
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            All Tours
          </h1>
          <p className="text-gray-600">
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
                <Button variant="outline" className="md:hidden">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] overflow-y-auto">
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

        <div className="flex gap-8">
          {/* Desktop Filters Sidebar */}
          <div className="hidden md:block w-80">
            <TourFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={clearFilters}
            />
          </div>

          {/* Tours Grid */}
          <div className="flex-1">
            {/* Results count */}
            <div className="mb-4 text-sm text-gray-600">
              Showing {tours.length} of {totalResults} tours
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
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2">No tours found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your filters or search criteria
                </p>
                <Button onClick={clearFilters}>Clear all filters</Button>
              </div>
            ) : (
              /* Tours Grid */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tours.map((tour) => (
                  <TourCard key={tour._id} tour={tour} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>

                <div className="flex gap-2">
                  {[...Array(totalPages)].map((_, i) => (
                    <Button
                      key={i}
                      variant={currentPage === i + 1 ? "default" : "outline"}
                      onClick={() => setCurrentPage(i + 1)}
                      className="w-10"
                    >
                      {i + 1}
                    </Button>
                  ))}
                </div>

                <Button
                  variant="outline"
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
