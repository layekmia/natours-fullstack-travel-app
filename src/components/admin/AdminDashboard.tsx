import { adminAPI } from "@/api/admin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Calendar, DollarSign, MapPin, Star, Users } from "lucide-react";

export const AdminDashboard = () => {
  const { data: stats } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: () => adminAPI.getStats(),
  });

  const statsData = stats?.data;

  console.log(statsData);

  const cards = [
    {
      title: "Total Tours",
      value: statsData?.totalTours || 0,
      icon: MapPin,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      title: "Total Users",
      value: statsData?.totalUsers || 0,
      icon: Users,
      color: "text-green-600",
      bg: "bg-green-100",
    },
    {
      title: "Total Bookings",
      value: statsData?.totalBookings || 0,
      icon: Calendar,
      color: "text-purple-600",
      bg: "bg-purple-100",
    },
    {
      title: "Total Revenue",
      value: `$${statsData?.totalRevenue?.toLocaleString() || 0}`,
      icon: DollarSign,
      color: "text-orange-600",
      bg: "bg-orange-100",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Welcome back! Here's what's happening with your platform.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <Card key={card.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{card.title}</p>
                  <p className="text-2xl font-bold mt-1">{card.value}</p>
                </div>
                <div className={`${card.bg} p-3 rounded-full`}>
                  <card.icon className={`h-6 w-6 ${card.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {statsData?.recentBookings?.map((booking) => (
                <div
                  key={booking._id}
                  className="flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium">{booking.tour?.name}</p>
                    <p className="text-sm text-gray-500">
                      by {booking.user?.name}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${booking.price}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(booking.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
              {(!statsData?.recentBookings ||
                statsData.recentBookings.length === 0) && (
                <p className="text-gray-500 text-center py-4">
                  No recent bookings
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Top Tours */}
        <Card>
          <CardHeader>
            <CardTitle>Popular Tours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {statsData?.popularTours?.map((tour) => (
                <div
                  key={tour._id}
                  className="flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium">{tour.name}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{tour.ratingAverage}</span>
                      <span className="text-xs text-gray-500">
                        ({tour.ratingQuantity} reviews)
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
