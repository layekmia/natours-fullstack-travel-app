import { Location } from "@/types";
import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapPin, Navigation } from "lucide-react";

// Fix for default marker icons in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

interface TourMapProps {
  startLocation: {
    type: string;
    coordinates: [number, number];
    address: string;
    description: string;
  };
  locations: Location[];
}

export const TourMap = ({ startLocation, locations }: TourMapProps) => {
  // Calculate center point (use start location)
  const center: [number, number] = [
    startLocation.coordinates[1],
    startLocation.coordinates[0],
  ];

  // Create path from all locations
  const pathCoordinates: [number, number][] = [
    [startLocation.coordinates[1], startLocation.coordinates[0]],
    ...locations.map(
      (loc) => [loc.coordinates[1], loc.coordinates[0]] as [number, number],
    ),
  ];

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md border border-gray-100 dark:border-gray-800 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 bg-gradient-to-r from-white to-gray-50 dark:from-gray-900 dark:to-gray-800/50">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-primary-100 dark:bg-primary-900/50">
            <MapPin className="h-4 w-4 text-primary-600 dark:text-primary-400" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Tour Locations
          </h2>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 ml-7">
          Interactive map showing your adventure route
        </p>
      </div>

      {/* Map Container */}
      <div className="relative">
        <div className="absolute top-3 left-3 z-10 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-md border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
            <Navigation className="h-3 w-3 text-primary-500" />
            <span>{locations.length + 1} stops along the way</span>
          </div>
        </div>
        <div className="rounded-xl overflow-hidden m-1">
          <MapContainer
            // @ts-ignore
            center={center}
            zoom={6}
            style={{ height: "420px", width: "100%" }}
            className="z-0 rounded-xl"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              // @ts-ignore
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {/* Start Location Marker */}
            <Marker
              position={[
                startLocation.coordinates[1],
                startLocation.coordinates[0],
              ]}
            >
              <Popup>
                <div className="text-center min-w-[180px]">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <strong className="text-green-600">Start Point</strong>
                  </div>
                  <p className="text-sm font-medium mt-1">
                    {startLocation.description}
                  </p>
                  <p className="text-xs text-gray-500 mt-1 break-words">
                    {startLocation.address}
                  </p>
                </div>
              </Popup>
            </Marker>
            {/* Tour Locations Markers */}
            {locations.map((location, index) => (
              <Marker
                key={index}
                position={[location.coordinates[1], location.coordinates[0]]}
              >
                <Popup>
                  <div className="text-center min-w-[180px]">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <div className="w-2 h-2 rounded-full bg-primary-500" />
                      <strong className="text-primary-600">
                        Day {location.day}
                      </strong>
                    </div>
                    <p className="text-sm font-medium mt-1">
                      {location.description}
                    </p>
                    <p className="text-xs text-gray-500 mt-1 break-words">
                      {location.address}
                    </p>
                  </div>
                </Popup>
              </Marker>
            ))}
            {/* Path Line */}
            <Polyline
              positions={pathCoordinates}
              // @ts-ignore
              color="#22c55e"
              weight={4}
              opacity={0.8}
            />
          </MapContainer>
        </div>
      </div>

      {/* Location List */}
      <div className="px-6 py-5 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/30">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <div className="w-1 h-5 bg-gradient-to-b from-primary-500 to-primary-700 rounded-full" />
          Tour Stops ({locations.length + 1})
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Start Location */}
          <div className="flex items-start gap-3 p-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
              <span className="text-green-600 dark:text-green-400 text-sm font-bold">
                S
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                Starting Point
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate">
                {startLocation.description}
              </p>
            </div>
          </div>

          {/* Tour Locations */}
          {locations.map((location, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all group"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-primary-600 dark:text-primary-400 text-sm font-bold">
                  {location.day}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  Day {location.day}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate">
                  {location.description}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 truncate">
                  📍 {location.address}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
