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

  return (
    <>
      <div className="space-y-4 md:space-y-6">
        <div className="bg-secondary">
          <div className="pad-x py-8 md:py-12 flex md:flex-row flex-col md:justify-between gap-8">
            {/* Images for daycare */}
            <div>
              <Image
                src={`${baseUrl}/${data?.data.facility_images[0].image_url}`}
                alt={data?.data.name ?? "Daycare"}
                width={1000}
                height={1000}
                className="w-[500px] object-cover h-[300px] rounded-lg"
              />
            </div>
            {/* Main information daycare */}
            <div className="space-y-4 md:space-y-8">
              <div className="space-y-4">
                <div>
                  <h1 className="md:text-3xl text-xl font-bold">
                    {data?.data.name}
                  </h1>
                </div>
                <div className="flex items-center space-x-2">
                  <RatingStars rating={data?.data.rating || 0} />{" "}
                  <span className="text-sm text-muted-foreground">
                    ({data?.data.reviewers_count})
                  </span>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <div className="flex gap-2">
                    <MapPin className="h-5 w-5 flex-shrink-0" />
                    <p>{data?.data.address}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 flex-shrink-0" />
                    <p>{data?.data.opening_days}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-5 w-5 flex-shrink-0" />
                    <p>{data?.data.phone_number}</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Button for booking and rating */}
            <div className="md:inline hidden">
              <Card className="shadow rounded-lg min-w-[300px]">
                <CardContent className="p-6">
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
            </div>
          </div>
        </div>
        <div className="pad-x md:space-y-16 space-y-12 py-6">
          <div className="flex md:flex-row flex-col gap-8 md:gap-12">
            <div className="md:w-8/12">
              <div className="md:space-y-6 space-y-4">
                <Card>
                  <CardContent className="p-0">
                    <div className="space-y-4 md:space-y-8">
                      <div className="space-y-2 relative">
                        <h1 className="font-bold text-xl">About Daycare</h1>
                        <div className="relative">
                          <p
                            className={`text-muted-foreground leading-loose ${
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
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="md:w-4/12 w-full md:space-y-8 space-y-4">
              <div className="space-y-2">
                <h1 className="font-bold text-lg">Location</h1>
                {position ? (
                  <div
                    style={{
                      height: "250px",
                      width: "100%",
                      marginTop: "16px",
                    }}
                  >
                    <MapContainer
                      center={position}
                      zoom={13}
                      style={{
                        height: "100%",
                        width: "100%",
                        borderRadius: "12px",
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
              <div>
                <Card>
                  <CardContent className="p-0">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h1 className="font-bold text-lg">Our Nannies</h1>
                          <span className="bg-primary text-white px-3 rounded-xl font-medium text-sm">
                            {data?.data.nannies.length}
                          </span>
                        </div>
                      </div>
                      <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
                        {data?.data.nannies ? (
                          data?.data.nannies.map((nannies) => (
                            <Card
                              className="bg-secondary border-0 rounded-full"
                              key={nannies.id}
                            >
                              <CardContent className="flex flex-col p-0 justify-between h-full">
                                <Image
                                  src={`${baseUrl}/${nannies.images}`}
                                  alt={nannies.name}
                                  width={1000}
                                  height={1000}
                                  loading="lazy"
                                  className="object-cover rounded-full"
                                />
                              </CardContent>
                            </Card>
                          ))
                        ) : (
                          <p>No nannies available</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          <hr />
          {/* Facilities Daycare */}
          <div>
            <Card>
              <CardContent className="p-0">
                <div className="space-y-4 md:space-y-8">
                  <div className="space-y-2 text-center">
                    <h1 className="font-bold text-xl">Our Facilities</h1>
                    <p className="text-muted-foreground">
                      Berikut adalah fasilitas daycare kami.
                    </p>
                  </div>
                  <div>
                    <Carousel plugins={[plugin.current]}>
                      <CarouselContent>
                        {data?.data.facility_images?.map((facilitiesImage) => (
                          <CarouselItem
                            className="pl-1 md:basis-1/2 lg:basis-1/3"
                            key={facilitiesImage.id}
                          >
                            <div className="py-2 px-4 h-full">
                              <Card
                                className="bg-secondary border-0 h-full"
                                key={facilitiesImage.id}
                              >
                                <CardContent className="p-0 flex flex-col justify-between h-full">
                                  <Image
                                    src={`${baseUrl}/${facilitiesImage.image_url}`}
                                    alt={data?.data.name ?? "Daycare"}
                                    width={1000}
                                    height={1000}
                                    className="w-[500px] object-cover h-[300px] rounded-lg"
                                  />
                                </CardContent>
                              </Card>
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious />
                      <CarouselNext />
                    </Carousel>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <hr />
          {/* Rating for customer */}
          <div>
            <Card>
              <CardContent className="p-0">
                <div className="space-y-4 md:space-y-8">
                  <div className="space-y-2 text-center">
                    <h1 className="font-bold text-xl">From Happy Customer</h1>
                    <p className="text-muted-foreground">
                      Banyak orang tua puas dengan layanan kami. Apa kata
                      mereka? Berikut adalah testimoni asli dari mereka.
                    </p>
                  </div>
                  <div>
                    <Carousel plugins={[plugin.current]}>
                      <CarouselContent>
                        {data?.data.reviews?.map((review) => (
                          <CarouselItem
                            className="pl-1 md:basis-1/2 lg:basis-1/3"
                            key={review.id}
                          >
                            <div className="py-2 px-4 h-full">
                              <Card
                                className="bg-secondary border-0 h-full"
                                key={review.id}
                              >
                                <CardContent className="p-4 flex flex-col justify-between h-full">
                                  <div className="space-y-4">
                                    <div className="flex items-center space-x-2">
                                      <RatingStars
                                        rating={review.rating || 0}
                                      />
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
                      <CarouselPrevious />
                      <CarouselNext />
                    </Carousel>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
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
