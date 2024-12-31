"use client";

import DialogGiveRateDaycare from "@/components/atoms/dialog/DialogGiveRateDaycare";
import LocationPicker from "@/components/atoms/location/LocationPicker";
import RatingStars from "@/components/atoms/rating/RatingStar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useToast } from "@/hooks/use-toast";
import { useGetDetailDaycare } from "@/http/daycares/get-detail-daycare";
import { baseUrl } from "@/utils/app";
import { generateFallbackFromName } from "@/utils/misc";
import { formatPrice } from "@/utils/price";
import Autoplay from "embla-carousel-autoplay";
import { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { Clock, MapPin, Phone } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import { formatTime } from "@/utils/hours";

interface DaycareDetailProps {
  id: number;
}

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

export default function CubLocationDetailContent({ id }: DaycareDetailProps) {
  const session = useSession();
  const { data, isPending } = useGetDetailDaycare({ id });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const icon = L.icon({ iconUrl: "/images/icons/marker-icon.png" });

  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false })
  );

  const { toast } = useToast();
  const router = useRouter();

  const latitude = data?.data.latitude;
  const longitude = data?.data.longitude;

  const position: [number, number] | null =
    latitude !== undefined && longitude !== undefined
      ? [latitude, longitude]
      : null;

  const handleBookingClick = () => {
    if (!session.data?.access_token) {
      toast({
        title: "Not logged in yet",
        description: "Please login to continue booking!",
        variant: "destructive",
      });
    } else {
      router.push(`/cub-location/${data?.data.id}/booking`);
    }
  };

  const handleGiveRating = () => {
    setIsDialogOpen(true);
  };

  const [selectedImage, setSelectedImage] = useState(
    `${baseUrl}/${data?.data.facility_images[0].image_url}`
  );

  return (
    <>
      <div className="space-y-4 md:space-y-6 py-8">
        <div className="pad-x-xl space-y-12 md:space-y-16">
          <div className="grid md:grid-cols-2 grid-cols-1 md:gap-8 gap-4">
            <div className="space-y-4 md:space-y-8">
              <div className="space-y-4">
                {/* Preview Image */}
                <Image
                  src={selectedImage}
                  alt={data?.data.name ?? "Daycare"}
                  width={1000}
                  height={1000}
                  className="w-full object-cover h-[450px] rounded"
                />

                {/* Clickable thumbnails */}
                <div className="flex items-center gap-4 overflow-x-auto no-scrollbar">
                  {data?.data.facility_images?.map((facilitiesImage) => (
                    <button
                      key={facilitiesImage.id}
                      onClick={() =>
                        setSelectedImage(
                          `${baseUrl}/${facilitiesImage.image_url}`
                        )
                      }
                    >
                      <Image
                        src={`${baseUrl}/${facilitiesImage.image_url}`}
                        alt={data?.data.name ?? "Daycare"}
                        width={1000}
                        height={1000}
                        className="w-[280px] object-cover h-[150px] rounded-lg"
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h1 className="text-xl md:text-2xl font-bold">
                  {data?.data.name}
                </h1>
                <div className="space-y-4 md:space-y-8">
                  <div className="space-y-2 relative">
                    <div className="relative">
                      <p
                        className={`leading-loose text-justify ${
                          isExpanded ? "line-clamp-none" : "line-clamp-4"
                        }`}
                      >
                        {data?.data.description}
                      </p>
                      {!isExpanded && (
                        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent dark:from-zinc-950 pointer-events-none"></div>
                      )}
                    </div>
                    <button
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="text-primary underline"
                    >
                      {isExpanded ? "Show Less" : "Read More"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-4 md:space-y-8">
              <Card className="rounded-lg shadow">
                <CardContent className="p-4 md:p-6 space-y-4 md:space-y-6">
                  <div className="flex">
                    <div className="md:w-4/12">Alamat</div>
                    <div className="md:w-8/12">{data?.data.address}</div>
                  </div>
                  <div className="flex">
                    <div className="md:w-4/12">Jam Buka</div>
                    <div className="md:w-8/12">
                      {data?.data.opening_days}{" "}
                      {formatTime(data?.data.opening_hours)} -{" "}
                      {formatTime(data?.data.closing_hours)}
                    </div>
                  </div>
                  <div className="flex">
                    <div className="md:w-4/12">Harga</div>
                    <div className="md:w-8/12">
                      {formatPrice(data?.data.price_half)} - {""}
                      {formatPrice(data?.data.price_full)}
                    </div>
                  </div>
                  <div className="flex">
                    <div className="md:w-4/12">Nomor Telepon</div>
                    <div className="md:w-8/12">{data?.data.phone_number}</div>
                  </div>
                  <div className="flex">
                    <div className="md:w-4/12">Lokasi</div>
                    <div className="md:w-8/12">
                      {data?.data.location_tracking}
                    </div>
                  </div>
                  <div className="flex">
                    <div className="md:w-4/12">Kota</div>
                    <div className="md:w-8/12">{data?.data.location}</div>
                  </div>
                  <div className="space-y-4">
                    <Button
                      className="w-full"
                      size={"lg"}
                      onClick={handleBookingClick}
                    >
                      Book Now
                    </Button>
                    <Button
                      variant={"outline"}
                      size={"lg"}
                      className="w-full border bg-secondary hover:bg-secondary/80"
                      onClick={handleGiveRating}
                    >
                      Give a Rating
                    </Button>
                  </div>
                </CardContent>
              </Card>
              {position ? (
                <div
                  style={{
                    height: "250px",
                    width: "100%",
                    marginTop: "16px",
                    zIndex: 0,
                  }}
                >
                  <MapContainer
                    center={position}
                    zoom={14}
                    style={{
                      height: "100%",
                      width: "100%",
                      borderRadius: "12px",
                      zIndex: 0,
                    }}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <ResetMapSize />
                    <Marker
                      key={data?.data.id}
                      position={[data?.data.latitude!, data?.data.longitude!]}
                      icon={defaultIcon}
                    >
                      <Popup>
                        <h1 className="font-bold">{data?.data.name}</h1>
                      </Popup>
                    </Marker>
                  </MapContainer>
                </div>
              ) : (
                <p>Memuat lokasi...</p>
              )}
            </div>
          </div>
          <Card>
            <CardContent className="p-0">
              <div className="space-y-4 md:space-y-6">
                <div className="space-y-2 text-left">
                  <h1 className="font-bold text-xl">Reviewers</h1>
                </div>
                <div>
                  <Carousel plugins={[plugin.current]}>
                    <CarouselContent>
                      {data?.data.reviews?.map((review) => (
                        <CarouselItem
                          className="pl-1 md:basis-1/2 lg:basis-1/3"
                          key={review.id}
                        >
                          <div className="py-2 px-2 h-full">
                            <Card
                              className="bg-secondary border-0 h-full"
                              key={review.id}
                            >
                              <CardContent className="p-4 flex flex-col justify-between h-full">
                                <div className="space-y-4">
                                  <div className="flex items-center space-x-2">
                                    <RatingStars rating={review.rating || 0} />
                                  </div>
                                  <div className="flex-grow">
                                    <p>{review.comment}</p>
                                  </div>
                                </div>
                                {/* profile reviewers */}
                                <div className="flex gap-2 items-center mt-4">
                                  <Avatar className="border border-muted">
                                    <AvatarFallback className="text-gray-700 bg-white">
                                      {generateFallbackFromName(
                                        review.user.name
                                      )}
                                    </AvatarFallback>
                                  </Avatar>
                                  <p className="font-semibold text-sm">
                                    {review.user.name}
                                  </p>
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                  </Carousel>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      {isDialogOpen && (
        <DialogGiveRateDaycare
          open={isDialogOpen}
          setOpen={setIsDialogOpen}
          id={id}
        />
      )}
      <div className="md:hidden fixed bottom-0 w-full">
        <div className="py-4 pad-x bg-white shadow-xl">
          <div className="flex gap-4">
            <Button
              variant={"outline"}
              size={"lg"}
              className="w-full border bg-secondary hover:bg-secondary/80"
              onClick={handleGiveRating}
            >
              Give a Rating
            </Button>
            <Button className="w-full" size={"lg"} onClick={handleBookingClick}>
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
