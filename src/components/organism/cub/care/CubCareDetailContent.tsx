"use client";

import RatingStars from "@/components/atoms/rating/RatingStar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useGetDetailNannies } from "@/http/nannies/get-detail-nannies";
import { baseUrl } from "@/utils/app";
import { generateFallbackFromName } from "@/utils/misc";
import { formatPrice } from "@/utils/price";
import Autoplay from "embla-carousel-autoplay";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

interface CubNestDetailProps {
  id: string;
}

export default function CubCareDetailContent({ id }: CubNestDetailProps) {
  const { data, isPending } = useGetDetailNannies({ id });
  const session = useSession();
  const router = useRouter();
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false })
  );

  const handleBookingClick = () => {
    if (!session.data?.access_token) {
      toast.error("Silahkan login terlebih dahulu untuk booking nannies!");
    } else {
      router.push(`/cub-care/${data?.data.id}/booking`);
    }
  };

  const handleCheckDaycare = () => {
    router.push(`/cub-location/${data?.data.daycare_id}`);
  };

  return (
    <div className="pad-x-xl py-8 space-y-8">
      <div className="grid md:grid-cols-2 grid-cols-1 gap-6 md:gap-8">
        <div>
          <Card>
            <div className="relative">
              {/* Background Image */}
              <CardHeader className="p-0 rounded-t-xl">
                <Image
                  src="/images/background.png"
                  alt="Background Nannies"
                  width={1000}
                  height={1000}
                  className="rounded-t-xl max-h-[100px] object-cover"
                />
              </CardHeader>

              {/* Profile Image */}
              <div className="absolute top-12 pl-6">
                <Image
                  src={`${baseUrl}/${data?.data.images}`}
                  alt={data?.data.name ?? "Nannies"}
                  width={100}
                  height={100}
                  className="rounded-full bg-primary"
                />
              </div>
            </div>

            {/* Content */}
            <CardContent className="p-6 shadow border rounded-b-xl pt-14">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h1 className="font-bold text-lg">{data?.data.name}</h1>
                  <p>{data?.data.experience_description}</p>
                </div>
                {data?.data.daycare && (
                  <div className="flex gap-4 items-center">
                    {data.data.daycare.images && (
                      <Image
                        src={`${baseUrl}/${data.data.daycare.images}`}
                        alt={data.data.daycare_name ?? "Daycare"}
                        width={1000}
                        height={1000}
                        className="rounded-full max-w-[50px] max-h-[50px]"
                      />
                    )}
                    <div className="space-y-1">
                      <h1>{data.data.daycare.name}</h1>
                      {data.data.daycare.rating && (
                        <div className="flex items-center space-x-2">
                          <RatingStars rating={data.data.daycare.rating} />
                          <span className="text-sm text-muted-foreground">
                            ({data.data.daycare.rating})
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardContent className="p-6 shadow border rounded-xl">
              <div className="space-y-4">
                <div className="flex md:flex-row flex-col">
                  <div className="md:w-4/12 text-muted-foreground">Daycare</div>
                  <div className="md:w-8/12">
                    {data?.data.daycare?.name ?? "Tidak Memiliki Daycare"}
                  </div>
                </div>
                <div className="flex md:flex-row flex-col">
                  <div className="md:w-4/12 text-muted-foreground">
                    Nomor Telepon
                  </div>
                  <div className="md:w-8/12">{data?.data.contact}</div>
                </div>
                <div className="flex md:flex-row flex-col">
                  <div className="md:w-4/12 text-muted-foreground">Lokasi</div>
                  <div className="md:w-8/12">
                    {data?.data.daycare?.address ?? "Lokasi Tidak Ada"}
                  </div>
                </div>
                <div className="flex md:flex-row flex-col">
                  <div className="md:w-4/12 text-muted-foreground">
                    Jenis Kelamin
                  </div>
                  <div className="md:w-8/12">
                    {data?.data.gender === "male"
                      ? "Laki-laki"
                      : data?.data.gender === "female"
                      ? "Perempuan"
                      : data?.data.gender}
                  </div>
                </div>
                <div className="flex md:flex-row flex-col">
                  <div className="md:w-4/12 text-muted-foreground">
                    Pilihan Harga
                  </div>
                  <div className="md:w-8/12">
                    <div className="space-y-2">
                      {data?.data.price_lists.map((price) => (
                        <div key={price.id}>
                          <h1>
                            {formatPrice(price.price)} ({price.name})
                          </h1>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <Button
                    className="w-full"
                    size={"lg"}
                    onClick={handleBookingClick}
                  >
                    Booking Sekarang
                  </Button>
                  <Button
                    className="w-full border-primary text-primary hover:text-primary"
                    size={"lg"}
                    onClick={handleCheckDaycare}
                    variant={"outline"}
                  >
                    Lihat Daycare Terkait
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Card>
        <CardContent className="p-0">
          <div className="space-y-4 md:space-y-6">
            <div className="space-y-2 text-left">
              <h1 className="font-bold text-xl">Reviewers Daycare</h1>
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
                                  {generateFallbackFromName(review.name)}
                                </AvatarFallback>
                              </Avatar>
                              <p className="font-semibold text-sm">
                                {review.name}
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
  );
}
