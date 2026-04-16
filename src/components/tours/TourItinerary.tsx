import { Location } from "@/types";
import { MapPin, Calendar, Clock, Mountain, Tent, Coffee, Ship, Info } from "lucide-react";

interface TourItineraryProps {
  locations: Location[];
  duration: number;
}

const getActivityType = (description: string): string => {
  const lowerDesc = description.toLowerCase();
  if (
    lowerDesc.includes("hike") ||
    lowerDesc.includes("trek") ||
    lowerDesc.includes("walk")
  ) {
    return "Hiking";
  }
  if (
    lowerDesc.includes("camp") ||
    lowerDesc.includes("stay") ||
    lowerDesc.includes("lodge")
  ) {
    return "Accommodation";
  }
  if (
    lowerDesc.includes("sight") ||
    lowerDesc.includes("view") ||
    lowerDesc.includes("scenic")
  ) {
    return "Sightseeing";
  }
  if (
    lowerDesc.includes("food") ||
    lowerDesc.includes("meal") ||
    lowerDesc.includes("lunch")
  ) {
    return "Meal";
  }
  if (
    lowerDesc.includes("boat") ||
    lowerDesc.includes("kayak") ||
    lowerDesc.includes("raft")
  ) {
    return "Water Activity";
  }
  return "Activity";
};

const getActivityColor = (type: string): string => {
  const colors: Record<string, string> = {
    Hiking: "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
    Accommodation: "bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800",
    Sightseeing: "bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-800",
    Meal: "bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-800",
    "Water Activity": "bg-cyan-100 dark:bg-cyan-900/50 text-cyan-700 dark:text-cyan-400 border-cyan-200 dark:border-cyan-800",
    Activity: "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400 border-gray-200 dark:border-gray-700",
  };
  return colors[type] || (colors["Activity"] as string);
};

const getActivityIcon = (type: string) => {
  switch (type) {
    case "Hiking":
      return <Mountain className="h-3 w-3" />;
    case "Accommodation":
      return <Tent className="h-3 w-3" />;
    case "Meal":
      return <Coffee className="h-3 w-3" />;
    case "Water Activity":
      return <Ship className="h-3 w-3" />;
    default:
      return <Info className="h-3 w-3" />;
  }
};

export const TourItinerary = ({ locations, duration }: TourItineraryProps) => {
  // Sort locations by day
  const sortedLocations = [...locations].sort(
    (a, b) => (a.day || 0) - (b.day || 0),
  );

  // Generate full itinerary including days without specific locations
  const fullItinerary = [];
  for (let day = 1; day <= duration; day++) {
    const locationForDay = sortedLocations.find((loc) => loc.day === day);
    if (locationForDay) {
      fullItinerary.push({ day, location: locationForDay, hasLocation: true });
    } else {
      fullItinerary.push({ day, location: null, hasLocation: false });
    }
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md border border-gray-100 dark:border-gray-800 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 bg-gradient-to-r from-white to-gray-50 dark:from-gray-900 dark:to-gray-800/50">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-primary-100 dark:bg-primary-900/50">
            <Calendar className="h-4 w-4 text-primary-600 dark:text-primary-400" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Tour Itinerary
          </h2>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 ml-7">
          Day-by-day breakdown of your {duration}-day adventure
        </p>
      </div>

      <div className="p-6">
        <div className="relative">
          {/* Timeline Line - Enhanced */}
          <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 via-primary-400 to-gray-200 dark:to-gray-700 hidden md:block rounded-full" />

          {/* Itinerary Items */}
          <div className="space-y-6">
            {fullItinerary.map((item, index) => {
              const activityType = item.location
                ? getActivityType(item.location.description)
                : "Free Day";
              const activityColor = getActivityColor(activityType);
              const activityIcon = getActivityIcon(activityType);

              if (item.hasLocation && item.location) {
                return (
                  <div key={index} className="relative flex gap-5 group">
                    {/* Day Circle - Enhanced */}
                    <div className="relative z-10">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-primary-700 text-white font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                        {item.day}
                      </div>
                      {/* Connecting Dot */}
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full bg-primary-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>

                    {/* Content Card - Enhanced */}
                    <div className="flex-1 bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700 group-hover:border-primary-200 dark:group-hover:border-primary-800">
                      <div className="flex flex-wrap justify-between items-start gap-3 mb-3">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Day {item.day}: {item.location.description}
                          </h3>
                          <div className="flex items-center gap-2 mt-1.5">
                            <MapPin className="h-3.5 w-3.5 text-gray-400" />
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {item.location.address}
                            </span>
                          </div>
                        </div>
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border shadow-sm ${activityColor}`}
                        >
                          {activityIcon}
                          {activityType}
                        </span>
                      </div>

                      {/* Coordinates (if available) */}
                      {item.location.coordinates && (
                        <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mt-2">
                          <MapPin className="h-3 w-3" />
                          <span className="font-mono">
                            📍 {item.location.coordinates[0]}, {item.location.coordinates[1]}
                          </span>
                        </div>
                      )}

                      {/* Activity Tips */}
                      {activityType === "Hiking" && (
                        <div className="mt-4 p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg text-xs text-emerald-700 dark:text-emerald-400 flex items-center gap-2 border border-emerald-200 dark:border-emerald-800">
                          <span className="text-base">🥾</span>
                          <span>Don't forget comfortable hiking shoes and water!</span>
                        </div>
                      )}
                      {activityType === "Water Activity" && (
                        <div className="mt-4 p-3 bg-cyan-50 dark:bg-cyan-950/30 rounded-lg text-xs text-cyan-700 dark:text-cyan-400 flex items-center gap-2 border border-cyan-200 dark:border-cyan-800">
                          <span className="text-base">💧</span>
                          <span>Bring swimwear, towel, and waterproof gear</span>
                        </div>
                      )}
                      {activityType === "Accommodation" && (
                        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg text-xs text-blue-700 dark:text-blue-400 flex items-center gap-2 border border-blue-200 dark:border-blue-800">
                          <span className="text-base">🏨</span>
                          <span>Comfortable accommodation with breakfast included</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              }

              // Free day (no specific location) - Enhanced
              return (
                <div key={index} className="relative flex gap-5 opacity-75">
                  <div className="relative z-10">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 font-bold shadow-sm">
                      {item.day}
                    </div>
                  </div>
                  <div className="flex-1 bg-gray-50 dark:bg-gray-800/30 rounded-xl p-5 border border-dashed border-gray-300 dark:border-gray-600">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                        Day {item.day}: Free Exploration
                      </h3>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                      Enjoy a free day to explore at your own pace, relax, or discover hidden gems
                    </p>
                    <div className="mt-3 flex items-center gap-2 text-xs text-gray-400">
                      <span>💡</span>
                      <span>Ask our guides for local recommendations</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Summary Section - Enhanced */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <div className="w-1 h-5 bg-gradient-to-b from-primary-500 to-primary-700 rounded-full" />
            What's Included
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <div className="w-1.5 h-1.5 bg-primary-500 rounded-full" />
              <span>Professional local guide</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <div className="w-1.5 h-1.5 bg-primary-500 rounded-full" />
              <span>All activities mentioned in itinerary</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <div className="w-1.5 h-1.5 bg-primary-500 rounded-full" />
              <span>Accommodation for {duration} nights</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <div className="w-1.5 h-1.5 bg-primary-500 rounded-full" />
              <span>Transportation between locations</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};