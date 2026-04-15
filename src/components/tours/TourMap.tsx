import { Location } from "@/types";

import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
} from "react-leaflet";

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
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-2xl font-bold mb-4">Tour Locations</h2>
      <div className="rounded-lg overflow-hidden">
        <MapContainer
        // @ts-ignore
          center={center}
          zoom={6}
          style={{ height: "400px", width: "100%" }}
          className="z-0"
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
              <div className="text-center">
                <strong>📍 Start Point</strong>
                <p className="text-sm mt-1">{startLocation.description}</p>
                <p className="text-xs text-gray-500">{startLocation.address}</p>
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
                <div className="text-center">
                  <strong>Day {location.day}</strong>
                  <p className="text-sm mt-1">{location.description}</p>
                  <p className="text-xs text-gray-500">{location.address}</p>
                </div>
              </Popup>
            </Marker>
          ))}
          {/* Path Line */}
          <Polyline
            positions={pathCoordinates}
            // @ts-ignore
            color="#22c55e"
            weight={3}
            opacity={0.7}
          />
        </MapContainer>
      </div>

      {/* Location List */}
      <div className="mt-4">
        <h3 className="font-semibold mb-2">Tour Stops</h3>
        <div className="space-y-2">
          <div className="flex items-start gap-2 text-sm">
            <span className="text-primary-600 font-bold">📍</span>
            <div>
              <span className="font-medium">Start: </span>
              {startLocation.description}
            </div>
          </div>
          {locations.map((location, index) => (
            <div key={index} className="flex items-start gap-2 text-sm">
              <span className="text-primary-600 font-bold">
                Day {location.day}
              </span>
              <div>
                <span className="font-medium">{location.description}</span>
                <span className="text-gray-500 ml-2">- {location.address}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
