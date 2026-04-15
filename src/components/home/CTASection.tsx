import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Shield,
  CreditCard,
  Headphones,
  Sparkles,
} from "lucide-react";

export const CTASection = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 dark:from-primary-950 dark:via-primary-900 dark:to-primary-950">
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10 animate-shimmer" />
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000" />

        <div className="absolute top-20 left-10 animate-bounce-slow">
          <Sparkles className="h-6 w-6 text-white/20" />
        </div>
        <div className="absolute bottom-20 right-10 animate-bounce-slow delay-500">
          <Sparkles className="h-8 w-8 text-white/20" />
        </div>
        <div className="absolute top-1/2 left-1/4 animate-pulse">
          <Sparkles className="h-4 w-4 text-white/15" />
        </div>
      </div>

      <div className="relative container mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
          <Sparkles className="h-4 w-4 text-yellow-400" />
          <span className="text-sm font-medium text-white/90">
            Limited Time Offer
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
          Ready for Your Next{" "}
          <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
            Adventure?
          </span>
        </h2>

        {/* Description */}
        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Join thousands of happy travelers who have explored the world with
          Natours
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button
            size="lg"
            variant="secondary"
            asChild
            className="group bg-white text-primary-700 hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <Link to="/tours">
              Book Your Tour Now
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>

          <Button
            size="lg"
            variant="outline"
            asChild
            className="bg-transparent border-white text-white hover:bg-white/10 hover:scale-105 transition-all duration-300"
          >
            <Link to="/tours">Explore Tours</Link>
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8 pt-6 border-t border-white/10 max-w-3xl mx-auto">
          <div className="flex items-center gap-2 text-white/80">
            <Shield className="h-4 w-4" />
            <span className="text-sm">Secure Booking</span>
          </div>
          <div className="flex items-center gap-2 text-white/80">
            <CreditCard className="h-4 w-4" />
            <span className="text-sm">Easy Payments</span>
          </div>
          <div className="flex items-center gap-2 text-white/80">
            <Headphones className="h-4 w-4" />
            <span className="text-sm">24/7 Support</span>
          </div>
        </div>
      </div>
    </section>
  );
};
