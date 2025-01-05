"use client";

import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  Circle,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";
import Link from "next/link";
import { useGetAllDaycare } from "@/http/daycares/get-all-daycares";

const mapContainerStyle = {
  width: "100%",
  height: "100vh",
};

const defaultCenter = { lat: -6.2, lng: 106.816666 };

export default function CubLocationMapsContent() {
  const [query, setQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState<string>("");
  const [userLocation, setUserLocation] =
    useState<google.maps.LatLngLiteral | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);
  const [selectedDaycare, setSelectedDaycare] = useState<any>(null);
  const [mapRef, setMapRef] = useState<google.maps.Map | null>(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
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

  const { data, isPending } = useGetAllDaycare({ location: locationFilter });

  const filteredDaycares = Array.isArray(data?.data)
    ? data.data.filter((daycare) =>
        daycare.name.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const onSearch = (value: string) => {
    setQuery(value);
  };

  const onFilterChange = (location: string) => {
    setLocationFilter(location);
  };

  const handleMarkerClick = (daycare: any) => {
    setSelectedDaycare(daycare);
    if (mapRef) {
      mapRef.panTo({ lat: daycare.latitude, lng: daycare.longitude });
      mapRef.setZoom(16);
    }
  };

  if (!isLoaded) {
    return <p>Loading Maps...</p>;
  }

  return (
    <>
      <div style={{ width: "100%", height: "100vh" }}>
        {isLoadingLocation ? (
          <p>Memuat lokasi Anda...</p>
        ) : (
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={userLocation || defaultCenter}
            zoom={12}
            onLoad={(map) => setMapRef(map)}
            options={{
              disableDefaultUI: true,
              zoomControl: true,
              mapTypeControl: false,
            }}
          >
            {userLocation && (
              <>
                <Marker
                  position={userLocation}
                  icon={{
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 6,
                    fillColor: "#4285F4",
                    fillOpacity: 1,
                    strokeWeight: 2,
                    strokeColor: "#ffffff",
                  }}
                  title="Lokasi Anda"
                />
                <Circle
                  center={userLocation}
                  radius={100}
                  options={{
                    fillColor: "#4285F4",
                    fillOpacity: 0.2,
                    strokeColor: "#4285F4",
                    strokeOpacity: 0.5,
                    strokeWeight: 1,
                  }}
                />
              </>
            )}

            {filteredDaycares.map((daycare) => (
              <Marker
                key={daycare.id}
                position={{ lat: daycare.latitude, lng: daycare.longitude }}
                onClick={() => handleMarkerClick(daycare)}
              />
            ))}

            {selectedDaycare && (
              <InfoWindow
                position={{
                  lat: selectedDaycare.latitude,
                  lng: selectedDaycare.longitude,
                }}
                onCloseClick={() => setSelectedDaycare(null)}
                options={{
                  pixelOffset: new google.maps.Size(0, -30),
                }}
              >
                <div className="space-y-3 w-40">
                  <h1 className="font-semibold">{selectedDaycare.name}</h1>
                  <div>
                    <Link
                      href={`/cub-location/${selectedDaycare.id}`}
                      className="text-primary font-semibold"
                    >
                      Baca Selengkapnya
                    </Link>
                  </div>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        )}
      </div>
    </>
  );
}
