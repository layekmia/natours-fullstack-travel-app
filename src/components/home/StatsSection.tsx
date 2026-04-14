import { Compass, Users, MapPin, Star } from "lucide-react";

const stats = [
  { number: "500+", label: "Adventure Tours", icon: Compass },
  { number: "50k+", label: "Happy Travelers", icon: Users },
  { number: "120+", label: "Destinations", icon: MapPin },
  { number: "4.9", label: "Average Rating", icon: Star },
];

export const StatsSection = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <stat.icon className="h-8 w-8 mx-auto mb-3 opacity-80" />
              <div className="text-3xl md:text-4xl font-bold">
                {stat.number}
              </div>
              <div className="text-sm opacity-80 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
