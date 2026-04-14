import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export const BookingSkeleton = () => {
  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <Skeleton className="md:w-48 h-48 md:h-auto" />
        <div className="flex-1 p-5 space-y-3">
          <Skeleton className="h-6 w-48" />
          <div className="flex gap-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-28" />
          </div>
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-16 w-full" />
          <div className="flex justify-end">
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
      </div>
    </Card>
  );
};
