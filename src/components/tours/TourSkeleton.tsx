import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const TourSkeleton = () => {
  return (
    <Card className="overflow-hidden border-0 shadow-sm group bg-primary-900">
      <div className="relative overflow-hidden">
        <Skeleton className="h-56 w-full rounded-b-none" />

        <div className="absolute top-4 right-4">
          <Skeleton className="h-8 w-16 rounded-full" />
        </div>

        <div className="absolute bottom-4 left-4">
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
      </div>

      <CardContent className="p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-3.5 w-3.5 rounded-sm" />
              ))}
            </div>
            <Skeleton className="h-4 w-12" />
          </div>
          <Skeleton className="h-4 w-16" />
        </div>

        <Skeleton className="h-6 w-3/4" />

        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>

        <div className="flex items-center gap-4 pt-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-28" />
        </div>

        <div className="h-px bg-gray-100 dark:bg-gray-800 my-2" />

        <div className="flex items-center justify-between pt-1">
          <div>
            <Skeleton className="h-3 w-16 mb-1" />
            <Skeleton className="h-6 w-20" />
          </div>
          <Skeleton className="h-9 w-24 rounded-lg" />
        </div>
      </CardContent>
    </Card>
  );
};
