import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { Calendar, CheckCircle, Home, Mail } from "lucide-react";

import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import confetti from "canvas-confetti";

export const BookingSuccess = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    // Scroll to top
    window.scrollTo(0, 0);

    // Trigger confetti animation
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#22c55e", "#16a34a", "#15803d", "#fbbf24", "#f59e0b"],
    });

    // Auto redirect countdown
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // eslint-disable-next-line react-hooks/purity
  const bookingId = Math.random().toString(36).substring(2, 10).toUpperCase();
  const shareUrl = window.location.href;

  const handleShare = (platform: string) => {
    const text = `I just booked an amazing tour with Natours! 🏔️✈️ Check them out!`;
    const url = shareUrl;

    const shareLinks: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent("Natours Booking")}&summary=${encodeURIComponent(text)}`,
    };

    window.open(shareLinks[platform], "_blank", "width=600,height=400");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <Card className="border-0 shadow-2xl rounded-2xl overflow-hidden bg-white dark:bg-gray-900">
          <div className="relative">
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500" />

            <CardHeader className="text-center pt-8 pb-4">
              <CardTitle className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
                Booking Confirmed! 🎉
              </CardTitle>
              <CardDescription className="text-lg mt-2">
                Your adventure is about to begin
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6 p-6 md:p-8">
              <div className="bg-green-50 dark:bg-green-950/30 rounded-xl p-4 text-center border border-green-200 dark:border-green-800">
                <p className="text-green-800 dark:text-green-300">
                  Thank you for booking with Natours! A confirmation email has
                  been sent to your inbox.
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary-500" />
                  Booking Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">
                      Booking Reference
                    </p>
                    <p className="font-mono font-semibold text-gray-900 dark:text-white">
                      #{bookingId}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">
                      Booking Date
                    </p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {new Date().toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">
                      Payment Status
                    </p>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-400 text-xs font-medium">
                      <CheckCircle className="h-3 w-3" />
                      Paid
                    </span>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">
                      Customer Email
                    </p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {user?.email}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary-500" />
                  What's Next?
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                    <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center flex-shrink-0">
                      <span className="text-primary-600 dark:text-primary-400 font-bold">
                        1
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        Check your email
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        You'll receive a confirmation email with your booking
                        details and itinerary
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                    <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center flex-shrink-0">
                      <span className="text-primary-600 dark:text-primary-400 font-bold">
                        2
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        Prepare for your trip
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Pack your bags and get ready for an unforgettable
                        adventure
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                    <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center flex-shrink-0">
                      <span className="text-primary-600 dark:text-primary-400 font-bold">
                        3
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        Contact support if needed
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Have questions? Our support team is available 24/7 to
                        assist you
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                    <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center flex-shrink-0">
                      <span className="text-primary-600 dark:text-primary-400 font-bold">
                        4
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        Share your experience
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        After your tour, leave a review and help other travelers
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center pt-4 border-t border-gray-100 dark:border-gray-800">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Share your excitement with friends
                </p>
                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => handleShare("twitter")}
                    className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors group"
                  >
                    <FaTwitter className="h-5 w-5 text-gray-600 dark:text-gray-400 group-hover:text-blue-500" />
                  </button>
                  <button
                    onClick={() => handleShare("facebook")}
                    className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors group"
                  >
                    <FaFacebook className="h-5 w-5 text-gray-600 dark:text-gray-400 group-hover:text-blue-600" />
                  </button>
                  <button
                    onClick={() => handleShare("linkedin")}
                    className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors group"
                  >
                    <FaLinkedin className="h-5 w-5 text-gray-600 dark:text-gray-400 group-hover:text-blue-700" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button asChild variant="outline" className="flex-1 gap-2">
                  <Link to="/my-bookings">
                    <Calendar className="h-4 w-4" />
                    View My Bookings
                  </Link>
                </Button>
                <Button
                  asChild
                  className="flex-1 gap-2 bg-primary-600 hover:bg-primary-700"
                >
                  <Link to="/">
                    <Home className="h-4 w-4" />
                    Back to Home
                  </Link>
                </Button>
              </div>

              {/* Auto Redirect Notice */}
              <p className="text-center text-xs text-gray-500 dark:text-gray-500 pt-2">
                You will be redirected to home page in {countdown} seconds
                <button
                  onClick={() => navigate("/")}
                  className="ml-2 text-primary-600 hover:underline"
                >
                  redirect now
                </button>
              </p>
            </CardContent>
          </div>
        </Card>

        {/* Trust Badge */}
        <div className="text-center mt-6">
          <p className="text-xs text-gray-500 dark:text-gray-500">
            🔒 Your booking is secure and guaranteed. Need help? Contact our
            24/7 support team.
          </p>
        </div>
      </div>
    </div>
  );
};
