"use client";

import DialogGiveRateDaycare from "@/components/atoms/dialog/DialogGiveRateDaycare";
import RatingStars from "@/components/atoms/rating/RatingStar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useGetDetailDaycare } from "@/http/daycares/get-detail-daycare";
import { baseUrl } from "@/utils/app";
import { buildFromAppURL, generateFallbackFromName } from "@/utils/misc";
import { formatPrice } from "@/utils/price";
import Autoplay from "embla-carousel-autoplay";
import "leaflet/dist/leaflet.css";
import { BadgeCheck, Info } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { formatTime } from "@/utils/hours";
import { Skeleton } from "@/components/ui/skeleton";
import {
  GoogleMap,
  InfoWindow,
  LoadScript,
  Marker,
} from "@react-google-maps/api";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

interface DaycareDetailProps {
  id: string;
}

export default function CubLocationDetailContent({ id }: DaycareDetailProps) {
  const session = useSession();
  const { data, isPending } = useGetDetailDaycare({ id });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState<null | {
    lat: number;
    lng: number;
  }>(null);

  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false })
  );
  const router = useRouter();

  const latitude = data?.data.latitude;
  const longitude = data?.data.longitude;

  const position =
    latitude && longitude ? { lat: latitude, lng: longitude } : null;

  const handleBookingClick = () => {
    if (!session.data?.access_token) {
      toast.error("Not Login Yet", {
        description: "Please login to continue booking!",
      });
    } else {
      router.push(`/cub-location/${data?.data.id}/booking`);
    }
  };

  const handleGiveRating = () => {
    setIsDialogOpen(true);
  };

  const handleMarkerClick = () => {
    if (position) {
      setSelectedMarker({
        lat: position.lat + 0.003,
        lng: position.lng,
      });
    }
  };

  const handleInfoWindowClose = () => {
    setSelectedMarker(null);
  };

  const selectedImage = data?.data.facility_images?.[0]?.image_url
    ? `${baseUrl}/${data.data.facility_images[0].image_url}`
    : null;

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    if (!previewImage && selectedImage) {
      setPreviewImage(selectedImage);
    }
  }, [selectedImage, previewImage]);

  return (
    <>
      <div className="space-y-4 md:space-y-6 py-8">
        <div className="pad-x-xl space-y-12 md:space-y-16">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-8">
            <div className="space-y-4 md:space-y-8">
              <div className="space-y-4">
                {/* Preview Image */}
                {previewImage ? (
                  <Image
                    src={previewImage}
                    alt={data?.data.name ?? "Daycare"}
                    width={1000}
                    height={1000}
                    className="w-full object-cover md:h-[450px] h-[250px] rounded"
                  />
                ) : (
                  <Skeleton className="w-full h-[450px] rounded" />
                )}

                {/* Clickable Thumbnails */}
                <Carousel>
                  <CarouselContent>
                    {data?.data.facility_images?.length
                      ? data.data.facility_images.map((facilitiesImage) => (
                          <CarouselItem
                            className="pl-1 basis-1/2 lg:basis-1/3"
                            key={facilitiesImage.id}
                          >
                            <button
                              onClick={() =>
                                setPreviewImage(
                                  `${baseUrl}/${facilitiesImage.image_url}`
                                )
                              }
                              className="block w-full h-full md:px-2 px-1"
                            >
                              <Image
                                src={`${baseUrl}/${facilitiesImage.image_url}`}
                                alt={data?.data.name ?? "Daycare"}
                                width={1000}
                                height={1000}
                                className="md:w-[350px] object-cover md:h-[150px] w-full h-[100px] rounded-lg"
                              />
                            </button>
                          </CarouselItem>
                        ))
                      : Array.from({ length: 4 }).map((_, index) => (
                          <CarouselItem
                            className="pl-1 md:basis-1/2 lg:basis-1/3"
                            key={index}
                          >
                            <Skeleton className="w-[280px] h-[150px] rounded-lg" />
                          </CarouselItem>
                        ))}
                  </CarouselContent>
                </Carousel>
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
                  {data?.data.is_disability ? (
                    <span className="flex gap-2 items-center text-green-600 font-semibold">
                      <BadgeCheck />
                      Accepting Disability
                    </span>
                  ) : null}
                  <div className="flex md:flex-row flex-col gap-1">
                    <div className="md:w-4/12">Address</div>
                    <div className="md:w-8/12">{data?.data.address}</div>
                  </div>
                  <div className="flex md:flex-row flex-col gap-1">
                    <div className="md:w-4/12">Opening Hours</div>
                    <div className="md:w-8/12">
                      {data?.data.opening_days}, {""}
                      {formatTime(data?.data.opening_hours)} -{" "}
                      {formatTime(data?.data.closing_hours)}
                    </div>
                  </div>
                  <div className="flex md:flex-row flex-col gap-1">
                    <div className="md:w-4/12">Phone Number</div>
                    <div className="md:w-8/12">{data?.data.phone_number}</div>
                  </div>
                  <div className="flex md:flex-row flex-col gap-1">
                    <div className="md:w-4/12">Location</div>
                    <div className="md:w-8/12">
                      {data?.data.location_tracking}
                    </div>
                  </div>
                  <div className="flex md:flex-row flex-col gap-1">
                    <div className="md:w-4/12">City</div>
                    <div className="md:w-8/12">{data?.data.location}</div>
                  </div>
                  <div className="flex md:flex-row flex-col gap-1">
                    <div className="md:w-4/12">Services Offered</div>
                    <div className="md:w-8/12">
                      <ul className="flex items-center gap-2">
                        {data?.data.price_lists.map((price) => (
                          <Badge key={price.id}>
                            {price.age_start} to {price.age_end}
                          </Badge>
                        ))}
                      </ul>
                    </div>
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
                      Write a Review
                    </Button>
                  </div>
                </CardContent>
              </Card>
              {position ? (
                <LoadScript
                  googleMapsApiKey={
                    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!
                  }
                >
                  <GoogleMap
                    mapContainerStyle={{
                      height: "250px",
                      width: "100%",
                      borderRadius: "12px",
                    }}
                    center={position}
                    zoom={14}
                    options={{
                      disableDefaultUI: true,
                      zoomControl: true,
                      mapTypeControl: false,
                    }}
                  >
                    <Marker position={position} onClick={handleMarkerClick} />

                    {selectedMarker && (
                      <InfoWindow
                        position={selectedMarker}
                        onCloseClick={handleInfoWindowClose}
                      >
                        <div>
                          <h1 className="font-bold">{data?.data.name}</h1>
                        </div>
                      </InfoWindow>
                    )}
                  </GoogleMap>
                </LoadScript>
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
                                    <AvatarImage
                                      src={buildFromAppURL(review.user.profile)}
                                    />
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
    </>
  );
}
