"use client";

import LocationPicker from "@/components/atoms/location/LocationPicker";
import { useGetAllDaycare } from "@/http/daycares/get-all-daycares";
import { useState, useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MapPin } from "lucide-react";

const defaultIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function ResetMapSize() {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 0);
  }, [map]);
  return null;
}

export default function CubLocationMapsContent() {
  const [query, setQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState<string>("");
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null
  );
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);

  const { data, isPending } = useGetAllDaycare({ location: locationFilter });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([
            position.coords.latitude,
            position.coords.longitude,
          ]);
          setIsLoadingLocation(false);
        },
        (error) => {
          console.error("Error mendapatkan lokasi:", error);
          setIsLoadingLocation(false);
        }
      );
    } else {
      console.error("Geolocation tidak didukung oleh browser.");
      setIsLoadingLocation(false);
    }
  }, []);

  const onSearch = (value: string) => {
    setQuery(value);
  };

  const onFilterChange = (location: string) => {
    setLocationFilter(location);
  };

  const filteredDaycares = Array.isArray(data?.data)
    ? data.data.filter((daycare) =>
        daycare.name.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <>
      <div style={{ width: "100%", height: "100vh" }}>
        {isLoadingLocation ? (
          <p>Memuat lokasi Anda...</p>
        ) : (
          <MapContainer
            center={userLocation || [-6.2, 106.816666]}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <ResetMapSize />
            {filteredDaycares.map((daycare) => (
              <Marker
                key={daycare.id}
                position={[daycare.latitude, daycare.longitude]}
                icon={defaultIcon}
              >
                <Popup>
                  <h1 className="font-bold">{daycare.name}</h1>
                  <div className="flex gap-2 items-center text-muted-foreground">
                    <MapPin className="h-4 w-4 flex-shrink-0" />
                    <p className="line-clamp-1 text-sm">{daycare.location}</p>
                  </div>
                  <Button variant={"outline"} size={"sm"}>
                    <Link href={`/cub-location/${daycare.id}`}>See Detail</Link>
                  </Button>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        )}
      </div>
    </>
  );
}
