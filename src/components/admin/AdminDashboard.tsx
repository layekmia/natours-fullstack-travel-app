import { adminAPI } from "@/api/admin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import {
  Calendar,
  DollarSign,
  MapPin,
  Star,
  Users,
  TrendingUp,
  TrendingDown,
  Activity,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Booking } from "@/types";

export const AdminDashboard = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: () => adminAPI.getStats(),
  });

  const statsData = stats?.data;

  const cards = [
    {
      title: "Total Tours",
      value: statsData?.totalTours || 0,
      icon: MapPin,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-100 dark:bg-blue-950/50",
      trend: "+12%",
      trendUp: true,
    },
    {
      title: "Total Users",
      value: statsData?.totalUsers || 0,
      icon: Users,
      color: "text-green-600 dark:text-green-400",
      bg: "bg-green-100 dark:bg-green-950/50",
      trend: "+8%",
      trendUp: true,
    },
    {
      title: "Total Bookings",
      value: statsData?.totalBookings || 0,
      icon: Calendar,
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-100 dark:bg-purple-950/50",
      trend: "+23%",
      trendUp: true,
    },
    {
      title: "Total Revenue",
      value: `$${statsData?.totalRevenue?.toLocaleString() || 0}`,
      icon: DollarSign,
      color: "text-orange-600 dark:text-orange-400",
      bg: "bg-orange-100 dark:bg-orange-950/50",
      trend: "+15%",
      trendUp: true,
    },
  ];

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div>
          <Skeleton className="h-9 w-48 mb-2" />
          <Skeleton className="h-5 w-80" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Skeleton className="h-4 w-20 mb-2" />
                    <Skeleton className="h-8 w-24" />
                  </div>
                  <Skeleton className="h-12 w-12 rounded-full" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6">
              <Skeleton className="h-64 w-full" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <Skeleton className="h-64 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 text-sm font-medium mb-3">
            <Activity className="h-3 w-3" />
            <span>Analytics Overview</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Welcome back! Here's what's happening with your platform.
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-900 px-3 py-2 rounded-lg shadow-sm">
          <Clock className="h-4 w-4" />
          <span>Last updated: {new Date().toLocaleDateString()}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <Card
            key={card.title}
            className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-md"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    {card.title}
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {card.value}
                  </p>
                  <div className="flex items-center gap-1 mt-2">
                    {card.trendUp ? (
                      <TrendingUp className="h-3 w-3 text-green-500" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-red-500" />
                    )}
                    <span
                      className={cn(
                        "text-xs font-medium",
                        card.trendUp
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400",
                      )}
                    >
                      {card.trend}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      vs last month
                    </span>
                  </div>
                </div>
                <div
                  className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-6",
                    card.bg,
                  )}
                >
                  <card.icon className={cn("h-6 w-6", card.color)} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <Card className="border-0 shadow-md">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary-500" />
                Recent Bookings
              </CardTitle>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Last 10 transactions
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {statsData?.recentBookings &&
              statsData.recentBookings.length > 0 ? (
                statsData.recentBookings.slice(0, 5).map((booking: Booking) => (
                  <div
                    key={booking._id}
                    className="flex justify-between items-center p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/50 dark:to-primary-800/50 flex items-center justify-center">
                        <Calendar className="h-4 w-4 text-primary-600 dark:text-primary-400" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {booking.tour?.name || "Unknown Tour"}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          by {booking.user?.name || "Unknown User"}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-primary-600 dark:text-primary-400">
                        ${booking.price}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(booking.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    <Calendar className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 dark:text-gray-400">
                    No recent bookings
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Popular Tours */}
        <Card className="border-0 shadow-md">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                Popular Tours
              </CardTitle>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                By rating & bookings
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {(statsData?.popularTours ?? []).length > 0 ? (
                statsData?.popularTours.slice(0, 5).map((tour) => (
                  <div
                    key={tour._id}
                    className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={tour.imageCover}
                          alt={tour.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {tour.name}
                        </p>
                        <div className="flex items-center gap-1 mt-0.5">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                            {tour.ratingAverage}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            ({tour.ratingQuantity} reviews)
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        ${tour.price}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {tour.duration} days
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    <Star className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 dark:text-gray-400">
                    No tour data available
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <QuickActionCard
          title="Add New Tour"
          description="Create a new adventure"
          icon={MapPin}
          href="/admin/tours/create"
          color="primary"
        />
        <QuickActionCard
          title="View All Users"
          description="Manage user accounts"
          icon={Users}
          href="/admin/users"
          color="green"
        />
        <QuickActionCard
          title="Check Bookings"
          description="View recent transactions"
          icon={Calendar}
          href="/admin/bookings"
          color="purple"
        />
        <QuickActionCard
          title="Moderate Reviews"
          description="Review user feedback"
          icon={Star}
          href="/admin/reviews"
          color="yellow"
        />
      </div>
    </div>
  );
};

// Quick Action Card Component
interface QuickActionCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  href: string;
  color: "primary" | "green" | "purple" | "yellow";
}

const QuickActionCard = ({
  title,
  description,
  icon: Icon,
  href,
  color,
}: QuickActionCardProps) => {
  const colorClasses = {
    primary:
      "bg-primary-50 dark:bg-primary-900/50 text-primary-600 dark:text-primary-400",
    green:
      "bg-green-50 dark:bg-green-950/50 text-green-600 dark:text-green-400",
    purple:
      "bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400",
    yellow:
      "bg-yellow-50 dark:bg-yellow-950/50 text-yellow-600 dark:text-yellow-400",
  };

  return (
    <a
      href={href}
      className="group block p-4 rounded-2xl bg-white dark:bg-gray-900 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110",
            colorClasses[color],
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
            {title}
          </h4>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {description}
          </p>
        </div>
      </div>
    </a>
  );
};
