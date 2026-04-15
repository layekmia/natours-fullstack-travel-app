import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Compass, Calendar, MapPin, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const howItWorks = [
  {
    step: "01",
    title: "Choose Your Tour",
    description: "Browse our curated selection of amazing tours worldwide",
    icon: Compass,
    gradient: "from-emerald-500 to-teal-500",
    delay: "0s",
  },
  {
    step: "02",
    title: "Book Online",
    description: "Secure your spot with our easy payment system",
    icon: Calendar,
    gradient: "from-blue-500 to-cyan-500",
    delay: "0.1s",
  },
  {
    step: "03",
    title: "Start Adventure",
    description: "Pack your bags and get ready for an unforgettable experience",
    icon: MapPin,
    gradient: "from-purple-500 to-pink-500",
    delay: "0.2s",
  },
];

export const HowItWorksSection = () => {
  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900/50 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-100/30 dark:bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary-100/30 dark:bg-primary-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 text-sm font-medium mb-4">
            <Compass className="h-4 w-4" />
            <span>Simple Process</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Three simple steps to start your adventure with Natours
          </p>
          <Separator className="w-20 mx-auto mt-6 bg-gradient-to-r from-primary-300 to-primary-500 dark:from-primary-600 dark:to-primary-800" />
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {howItWorks.map((item, index) => (
            <Card
              key={index}
              className={cn(
                "group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500",
                "bg-white dark:bg-gray-900",
                "hover:-translate-y-2",
              )}
              style={{ animationDelay: item.delay }}
            >
              {/* Gradient Border Effect */}
              <div
                className={cn(
                  "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                  "bg-gradient-to-br",
                  item.gradient,
                )}
                style={{
                  padding: "2px",
                  borderRadius: "inherit",
                  mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMask:
                    "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                }}
              />

              <CardContent className="p-8 text-center relative">
                {/* Step Number Background */}
                <div className="absolute top-6 right-6 text-7xl font-black text-gray-100 dark:text-gray-800 group-hover:text-white/10 transition-colors duration-500">
                  {item.step}
                </div>

                {/* Icon Container */}
                <div
                  className={cn(
                    "relative mb-6 inline-flex h-20 w-20 items-center justify-center rounded-2xl transition-all duration-500",
                    "bg-gradient-to-br",
                    item.gradient,
                    "shadow-lg group-hover:scale-110 group-hover:shadow-xl",
                  )}
                >
                  <item.icon className="h-10 w-10 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  {item.description}
                </p>

                {/* Connecting Line (except last) */}
                {index < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="h-6 w-6 text-gray-300 dark:text-gray-700" />
                  </div>
                )}

                {/* Learn More Link */}
                <button className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors inline-flex items-center gap-1 group-hover:gap-2">
                  Learn More
                  <ArrowRight className="h-3 w-3 transition-all group-hover:translate-x-1" />
                </button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA at Bottom */}
        <div className="text-center mt-12">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Ready to start your journey?
          </p>
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-all hover:gap-3">
            Browse All Tours
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
