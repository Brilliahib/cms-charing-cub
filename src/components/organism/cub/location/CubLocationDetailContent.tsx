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
import { BadgeCheck, Info, Star } from "lucide-react";
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
import { useGetNanniesByDaycare } from "@/http/nannies/get-nannies-by-daycare";
import Link from "next/link";

interface DaycareDetailProps {
  id: string;
}

export default function CubLocationDetailContent({ id }: DaycareDetailProps) {
  const session = useSession();
  const { data, isPending } = useGetDetailDaycare({ id });
  const { data: nannies } = useGetNanniesByDaycare(id);
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
      toast.error("Belum Login", {
        description: "Silahkan login sebelum melakukan pesan!",
      });
    } else {
      router.push(`/cub-location/${data?.data.id}/booking`);
    }
  };

  const handleGiveRating = () => {
    if (!session.data?.access_token) {
      toast.error("Belum Login", {
        description: "Silahkan login sebelum memberikan ulasan!",
      });
    } else {
      setIsDialogOpen(true);
    }
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
                      {isExpanded ? "Lihat Sebagian" : "Lihat Selengkapnya"}
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
                      Menerima Disabilitas
                    </span>
                  ) : null}
                  <div className="flex md:flex-row flex-col gap-1">
                    <div className="md:w-4/12 text-muted-foreground">
                      Alamat
                    </div>
                    <div className="md:w-8/12">{data?.data.address}</div>
                  </div>
                  <div className="flex md:flex-row flex-col gap-1">
                    <div className="md:w-4/12 text-muted-foreground">
                      Buka Jam
                    </div>
                    <div className="md:w-8/12">
                      {data?.data.opening_days}, Pukul {""}
                      {formatTime(data?.data.opening_hours)} -{" "}
                      {formatTime(data?.data.closing_hours)}
                    </div>
                  </div>
                  <div className="flex md:flex-row flex-col gap-1">
                    <div className="md:w-4/12 text-muted-foreground">
                      Nomor Telepon
                    </div>
                    <div className="md:w-8/12">{data?.data.phone_number}</div>
                  </div>
                  <div className="flex md:flex-row flex-col gap-1">
                    <div className="md:w-4/12 text-muted-foreground">
                      Lokasi
                    </div>
                    <div className="md:w-8/12">
                      {data?.data.location_tracking}
                    </div>
                  </div>
                  <div className="flex md:flex-row flex-col gap-1">
                    <div className="md:w-4/12 text-muted-foreground">Kota</div>
                    <div className="md:w-8/12">{data?.data.location}</div>
                  </div>
                  <div className="flex md:flex-row flex-col gap-1">
                    <div className="md:w-4/12 text-muted-foreground">
                      Daftar Harga
                    </div>
                    <div className="md:w-8/12">
                      <ol className="flex flex-col gap-4 ">
                        {data?.data.price_lists.map((price) => (
                          <li key={price.id}>
                            <div className="flex flex-col">
                              <span className="text-base font-semibold text-gray-800">
                                {formatPrice(price.price)} - {price.name}
                              </span>
                              <span className="text-sm text-gray-600">
                                Untuk umur {price.age_start} hingga{" "}
                                {price.age_end}
                              </span>
                            </div>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <Button
                      className="w-full"
                      size={"lg"}
                      onClick={handleBookingClick}
                    >
                      Pesan Sekarang
                    </Button>
                    <Button
                      variant={"outline"}
                      size={"lg"}
                      className="w-full border-primary text-primary hover:text-primary"
                      onClick={handleGiveRating}
                    >
                      Berikan Ulasan
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
                  <h1 className="font-bold text-xl">Daftar Ulasan</h1>
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
                              <CardContent className="p-6 flex flex-col justify-between h-full">
                                <div className="flex gap-4 items-center mb-4">
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
                                  <div className="space-y-1">
                                    <p className="font-semibold text-sm">
                                      {review.user.name}
                                    </p>
                                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                                      <Star
                                        className="h-4 w-4 text-yellow-500"
                                        fill="currentColor"
                                      />
                                      {review.rating}
                                    </div>
                                  </div>
                                </div>
                                <div className="space-y-4">
                                  <div className="flex-grow">
                                    <p>{review.comment}</p>
                                  </div>
                                </div>
                                {/* profile reviewers */}
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
          <div className="space-y-4 md:space-y-6">
            {nannies?.data && nannies.data.length > 0 && (
              <>
                <div className="space-y-4 md:space-y-6">
                  <div className="space-y-2 text-left">
                    <h1 className="font-bold text-xl">Daftar Nannies</h1>
                  </div>
                  <div className="grid md:grid-cols-4 grid-cols-1 gap-6">
                    {nannies.data.map((nanny) => (
                      <Link href={`/cub-care/${nanny.id}`} key={nanny.id}>
                        <Card className="border-0 shadow-none h-full">
                          <CardContent className="p-0">
                            <div className="flex flex-col space-y-2 h-full">
                              <div className="relative p-0 bg-secondary rounded-xl">
                                {/* image doctor */}
                                <Image
                                  src={`${baseUrl}/${nanny.images}`}
                                  alt={nanny.name}
                                  width={1000}
                                  height={1000}
                                  className="w-fit object-cover h-[200px] rounded-xl mx-auto"
                                />
                                <Image
                                  src={`${baseUrl}/${nanny.daycare?.images}`}
                                  alt={`${nanny.daycare?.name} Logo`}
                                  width={50}
                                  height={50}
                                  className="absolute top-2 right-4 w-10 h-10 rounded-full object-cover border border-white shadow-lg"
                                />
                              </div>
                              <div className="flex justify-between">
                                <h1 className="md:font-bold font-semibold text-base">
                                  {nanny.user.name}
                                </h1>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </div>
              </>
            )}
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
    </>
  );
}
