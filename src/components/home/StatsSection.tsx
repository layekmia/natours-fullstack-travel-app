import { cn } from "@/lib/utils";
import { Award, Compass, MapPin, Star, Users } from "lucide-react";

const stats = [
  {
    number: "500+",
    label: "Adventure Tours",
    icon: Compass,
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    number: "50k+",
    label: "Happy Travelers",
    icon: Users,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    number: "120+",
    label: "Destinations",
    icon: MapPin,
    gradient: "from-purple-500 to-pink-500",
  },
  {
    number: "4.9",
    label: "Average Rating",
    icon: Star,
    gradient: "from-amber-500 to-orange-500",
  },
];

export const StatsSection = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 dark:from-primary-950 dark:via-primary-900 dark:to-primary-950" />

      {/* Animated Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-dot-pattern" />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Our Impact in Numbers
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Creating unforgettable adventures for travelers worldwide
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group relative text-center p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:-translate-y-1"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Animated Icon Container */}
              <div
                className={cn(
                  "relative w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br p-0.5",
                  stat.gradient,
                )}
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative w-full h-full rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
              </div>

              {/* Number with Counter Effect */}
              <div className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">
                {stat.number}
              </div>

              {/* Label */}
              <div className="text-sm text-white/80 font-medium uppercase tracking-wide">
                {stat.label}
              </div>

              {/* Decorative Line */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-white/30 rounded-full group-hover:w-20 transition-all duration-300" />
            </div>
          ))}
        </div>

        {/* Trust Badge */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
            <Award className="h-4 w-4 text-yellow-400" />
            <span className="text-sm text-white/90">
              Trusted by adventurers worldwide
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
