import { bookingsAPI } from "@/api/bookings";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuth } from "@/context/AuthContext";
import { CreditCard, LogIn } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface BookingButtonProps {
  tourId: string;
  tourName: string;
  price: number;
}

export const BookingButton = ({ tourId, price }: BookingButtonProps) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);

  const handleBooking = async () => {
    if (!isAuthenticated) {
      setShowLoginDialog(true);
      return;
    }

    setIsLoading(true);
    try {
      await bookingsAPI.createCheckoutSession(tourId);
    } catch (error) {
      console.error("Booking error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        onClick={handleBooking}
        disabled={isLoading}
        className="w-full"
        size="lg"
      >
        <CreditCard className="h-4 w-4 mr-2" />
        {isLoading ? "Processing..." : `Book Now - $${price}`}
      </Button>

      {/* Login Dialog */}
      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Login Required</DialogTitle>
            <DialogDescription>
              Please login or create an account to book this tour
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-3 mt-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => navigate("/auth/login")}
            >
              <LogIn className="h-4 w-4 mr-2" />
              Login
            </Button>
            <Button className="flex-1" onClick={() => navigate("/auth/signup")}>
              Sign Up
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
