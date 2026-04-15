import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminAPI } from "@/api/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  MoreHorizontal,
  Search,
  Trash2,
  Eye,
  ChevronLeft,
  ChevronRight,
  Calendar,
  DollarSign,
  Users,
  TrendingUp,
} from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { Booking } from "@/types";

export const AdminBookings = () => {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteBookingId, setDeleteBookingId] = useState<string | null>(null);
  const itemsPerPage = 10;

  // Fetch bookings
  const { data, isLoading } = useQuery({
    queryKey: ["admin-bookings", currentPage, searchQuery],
    queryFn: () =>
      adminAPI.getAllBookings({
        page: currentPage,
        limit: itemsPerPage,
        search: searchQuery || undefined,
      }),
  });

  // Delete booking mutation
  const deleteMutation = useMutation({
    mutationFn: (id: string) => adminAPI.deleteBooking(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-bookings"] });
      toast.success("Booking deleted successfully");
      setDeleteBookingId(null);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to delete booking");
    },
  });

  const bookings = data?.data || [];
  const totalResults = data?.results || 0;
  const totalPages = Math.ceil(totalResults / itemsPerPage);

  const handleDelete = () => {
    if (deleteBookingId) {
      deleteMutation.mutate(deleteBookingId);
    }
  };

  // Calculate stats
  const totalRevenue = bookings.reduce(
    (sum: number, b: any) => sum + b.price,
    0,
  );
  const uniqueUsers = new Set(bookings.map((b: any) => b.user?._id)).size;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">All Bookings</h1>
        <p className="text-gray-600 mt-1">View and manage all tour bookings</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Bookings</p>
              <p className="text-2xl font-bold">{totalResults}</p>
            </div>
            <Calendar className="h-8 w-8 text-blue-400" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Revenue</p>
              <p className="text-2xl font-bold text-green-600">
                ${totalRevenue.toLocaleString()}
              </p>
            </div>
            <DollarSign className="h-8 w-8 text-green-400" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Unique Customers</p>
              <p className="text-2xl font-bold">{uniqueUsers}</p>
            </div>
            <Users className="h-8 w-8 text-purple-400" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Average Booking Value</p>
              <p className="text-2xl font-bold">
                ${totalResults ? Math.round(totalRevenue / totalResults) : 0}
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-orange-400" />
          </CardContent>
        </Card>
      </div>

      {/* Search Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by tour name or user email..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Bookings Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tour</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Booked Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : bookings.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    No bookings found
                  </TableCell>
                </TableRow>
              ) : (
                bookings.map((booking: Booking) => (
                  <TableRow key={booking._id}>
                    <TableCell className="font-medium">
                      <Link
                        to={`/tours/${booking.tour?._id}`}
                        className="hover:text-primary-600 hover:underline"
                      >
                        {booking.tour?.name || "Deleted Tour"}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={booking.user?.photo} />
                          <AvatarFallback>
                            {booking.user?.name?.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{booking.user?.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>${booking.price}</TableCell>
                    <TableCell>
                      {new Date(booking.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Badge variant={booking.paid ? "default" : "secondary"}>
                        {booking.paid ? "Paid" : "Pending"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem asChild>
                            <Link to={`/tours/${booking.tour?._id}`}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Tour
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => setDeleteBookingId(booking._id)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete Booking
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between flex-wrap gap-4">
          <p className="text-sm text-gray-600">
            Showing {bookings.length} of {totalResults} bookings
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <div className="flex gap-1">
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
                    variant={currentPage === pageNum ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(pageNum)}
                    className="w-10"
                  >
                    {pageNum}
                  </Button>
                );
              })}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!deleteBookingId}
        onOpenChange={() => setDeleteBookingId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Booking</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this booking? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
