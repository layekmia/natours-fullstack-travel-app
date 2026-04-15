import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useEffect, useState } from "react";

interface Props {
  value: [number, number]; // [lng, lat]
  onChange: (coords: [number, number]) => void;
}

function MarkerHandler({ value, onChange }: Props) {
  const [pos, setPos] = useState<[number, number]>(value);

  useEffect(() => {
    setPos(value);
  }, [value]);

  useMapEvents({
    click(e: any) {
      const coords: [number, number] = [e.latlng.lng, e.latlng.lat];
      setPos(coords);
      onChange(coords);
    },
  });

  return <Marker position={[pos[1], pos[0]]} />;
}

export default function LocationMapPicker({ value, onChange }: Props) {
  return (
    <div className="h-[220px] rounded-lg overflow-hidden border">
      <MapContainer
        // @ts-ignore
        center={[23.8103, 90.4125]}
        zoom={7}
        className="h-full w-full"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MarkerHandler value={value} onChange={onChange} />
      </MapContainer>
    </div>
  );
}
