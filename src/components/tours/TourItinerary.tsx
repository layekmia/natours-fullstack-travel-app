import { Location } from "@/types";
import {
  Bed,
  Camera,
  Coffee,
  Info,
  MapPin,
  Mountain,
  Sun,
  Utensils,
} from "lucide-react";

interface TourItineraryProps {
  locations: Location[];
  duration: number;
}

const getDayIcon = (day: number) => {
  const icons = [Sun, Mountain, Camera, Utensils, Coffee, Bed];
  return icons[day % icons.length] || MapPin;
};

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
    Hiking: "bg-green-100 text-green-700 border-green-200",
    Accommodation: "bg-blue-100 text-blue-700 border-blue-200",
    Sightseeing: "bg-purple-100 text-purple-700 border-purple-200",
    Meal: "bg-orange-100 text-orange-700 border-orange-200",
    "Water Activity": "bg-cyan-100 text-cyan-700 border-cyan-200",
    Activity: "bg-gray-100 text-gray-700 border-gray-200",
  };
  return colors[type] || colors["Activity"];
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
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-2xl font-bold mb-2">Tour Itinerary</h2>
      <p className="text-gray-600 mb-6">
        Day-by-day breakdown of your {duration}-day adventure
      </p>

      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200 hidden md:block" />

        {/* Itinerary Items */}
        <div className="space-y-6">
          {fullItinerary.map((item, index) => {
            const Icon = item.location
              ? getDayIcon(item.location.day || item.day)
              : Info;
            const activityType = item.location
              ? getActivityType(item.location.description)
              : "Free Day";
            const activityColor = getActivityColor(activityType);

            if (item.hasLocation && item.location) {
              return (
                <div key={index} className="relative flex gap-4 group">
                  {/* Day Circle */}
                  <div className="relative z-10">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-600 text-white font-bold shadow-md group-hover:scale-110 transition-transform">
                      {item.day}
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className="flex-1 bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex flex-wrap justify-between items-start gap-2 mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Day {item.day}: {item.location.description}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <MapPin className="h-3 w-3 text-gray-400" />
                          <span className="text-sm text-gray-500">
                            {item.location.address}
                          </span>
                        </div>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium border ${activityColor}`}
                      >
                        {activityType}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      {item.location.coordinates && (
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span>
                            Coordinates: {item.location.coordinates[0]},{" "}
                            {item.location.coordinates[1]}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Optional: Add a tip or highlight */}
                    {activityType === "Hiking" && (
                      <div className="mt-3 p-2 bg-green-50 rounded text-xs text-green-700 flex items-center gap-2">
                        <span>🥾</span>
                        <span>Don't forget comfortable hiking shoes!</span>
                      </div>
                    )}
                    {activityType === "Water Activity" && (
                      <div className="mt-3 p-2 bg-cyan-50 rounded text-xs text-cyan-700 flex items-center gap-2">
                        <span>💧</span>
                        <span>Bring swimwear and waterproof gear</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            }

            // Free day (no specific location)
            return (
              <div key={index} className="relative flex gap-4 opacity-70">
                <div className="relative z-10">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-300 text-gray-600 font-bold">
                    {item.day}
                  </div>
                </div>
                <div className="flex-1 bg-gray-50 rounded-lg p-4 border border-dashed border-gray-300">
                  <h3 className="text-lg font-semibold text-gray-700">
                    Day {item.day}: Free Exploration
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">
                    Enjoy a free day to explore at your own pace or relax
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Summary Section */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-3">What's Included</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <div className="w-2 h-2 bg-primary-600 rounded-full" />
            <span>Professional local guide</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <div className="w-2 h-2 bg-primary-600 rounded-full" />
            <span>All activities mentioned in itinerary</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <div className="w-2 h-2 bg-primary-600 rounded-full" />
            <span>Accommodation for {duration} nights</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <div className="w-2 h-2 bg-primary-600 rounded-full" />
            <span>Transportation between locations</span>
          </div>
        </div>
      </div>
    </div>
  );
};
