import React, { useState } from "react";
import { Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";

const icon = L.icon({ iconUrl: "/images/icons/marker-icon.png" });

const LocationPicker: React.FC = () => {
  const [position, setPosition] = useState<[number, number] | null>(null);

  useMapEvents({
    click(event: L.LeafletMouseEvent) {
      const { lat, lng } = event.latlng;
      setPosition([lat, lng]);
    },
  });

  return position ? <Marker position={position} icon={icon} /> : null;
};

export default LocationPicker;
