"use client";

import RatingStars from "@/components/atoms/rating/RatingStar";
import SectionTitle from "@/components/atoms/typography/SectionTitle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetAllDaycare } from "@/http/daycares/get-all-daycares";
import { baseUrl } from "@/utils/app";
import { MapPin, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import SearchInput from "@/components/atoms/search/SearchInput";
import { useEffect, useState } from "react";
import DialogFilterDaycare from "@/components/atoms/dialog/DialogFilterDaycare";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/utils/price";

export default function CubLocationContent() {
  const [query, setQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState<string>("");
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  const { data, isPending } = useGetAllDaycare({
    location: locationFilter,
    latitude,
    longitude,
  });

  const onSearch = (value: string) => {
    setQuery(value);
  };

  const onFilterChange = (location: string) => {
    setLocationFilter(location);
  };

  const getCurrentLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
          alert(
            "Tidak dapat mendapatkan lokasi. Pastikan izin lokasi diaktifkan."
          );
        }
      );
    } else {
      alert("Geolocation tidak didukung oleh browser ini.");
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const filteredDaycares = Array.isArray(data?.data)
    ? data.data.filter((daycare) =>
        daycare.name.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <>
      <div className="pad-x-xl lg:pt-8 md:pt-6 pt-4">
        <div className="space-y-8">
          <SectionTitle
            title="Cub Location"
            subtitle="Find Your Daycare In Here"
          />
          <div className="flex md:flex-row flex-col items-center gap-4">
            <SearchInput
              onSearch={onSearch}
              props="Search Daycare"
              className="md:max-w-[250px] w-full"
            />
            <div className="flex gap-4 w-full">
              <DialogFilterDaycare onFilterChange={onFilterChange} />
              <Button variant={"outline"}>
                <Link
                  href={"/cub-location/maps"}
                  className="flex items-center gap-2 font-normal"
                >
                  <MapPin /> See With Map
                </Link>
              </Button>
            </div>
          </div>
          <div className="grid md:grid-cols-4 grid-cols-1 md:gap-8 gap-6">
            {isPending ? (
              Array.from({ length: 4 }).map((_, index) => (
                <Card className="shadow-md hover:shadow-xl h-full" key={index}>
                  <CardHeader className="relative p-0 mb-4">
                    {/* Skeleton untuk gambar utama */}
                    <Skeleton className="w-full object-cover md:h-[150px] h-[180px] rounded-t-xl" />

                    {/* Skeleton untuk logo overlay */}
                    <Skeleton className="absolute top-0 right-2 w-10 h-10 rounded-full border border-white shadow-lg" />
                  </CardHeader>
                  <CardContent className="space-y-3 px-4">
                    {/* Skeleton untuk judul dan harga */}
                    <div className="flex justify-between items-start">
                      <Skeleton className="h-6 w-1/2" />
                      <Skeleton className="h-6 w-1/4" />
                    </div>

                    {/* Skeleton untuk alamat */}
                    <div className="flex gap-2 items-center">
                      <MapPin className="h-4 w-4 flex-shrink-0 text-gray-300" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>

                    {/* Skeleton untuk rating */}
                    <div className="flex items-center gap-2">
                      <Star
                        className="h-4 w-4 text-gray-300"
                        fill="currentColor"
                      />
                      <Skeleton className="h-4 w-1/4" />
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : !filteredDaycares || filteredDaycares.length === 0 ? (
              <p>No daycares available</p>
            ) : (
              filteredDaycares.map((daycare) => (
                <Link href={`/cub-location/${daycare.id}`} key={daycare.id}>
                  <Card className="shadow-md hover:shadow-xl h-full">
                    <CardHeader className="relative p-0 mb-4">
                      <Image
                        src={`${baseUrl}/${daycare.facility_images[0].image_url}`}
                        alt={daycare.name}
                        width={1000}
                        height={1000}
                        className="w-full object-cover md:h-[150px] h-[180px] rounded-t-xl"
                      />
                      <Image
                        src={`${baseUrl}/${daycare.images}`}
                        alt={`${daycare.name} Logo`}
                        width={50}
                        height={50}
                        className="absolute top-2 right-4 w-10 h-10 rounded-full object-cover border border-white shadow-lg"
                      />
                    </CardHeader>
                    <CardContent className="space-y-2 px-4">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <h1 className="font-semibold">{daycare.name}</h1>
                          <p className="text-sm font-semibold text-primary">
                            {daycare.distance} km
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <MapPin className="h-4 w-4 flex-shrink-0" />
                          <p className="line-clamp-2 text-sm">
                            {daycare.address}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Star
                            className="h-4 w-4 text-yellow-500"
                            fill="currentColor"
                          />
                          <p className="font-semibold text-sm">
                            {daycare.rating}{" "}
                            <span className="text-muted-foreground font-medium">
                              ({daycare.reviewers_count} reviews)
                            </span>
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
