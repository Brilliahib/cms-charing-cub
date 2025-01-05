"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import RatingStars from "@/components/atoms/rating/RatingStar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useGetDetailDaycare } from "@/http/daycares/get-detail-daycare";
import { baseUrl } from "@/utils/app";
import { generateFallbackFromName } from "@/utils/misc";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { CircleDollarSign, Phone } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DaycareDetailProps {
  id: string;
}

export default function DaycareDetailDashboardContent({
  id,
}: DaycareDetailProps) {
  const session = useSession();
  const { data, isPending } = useGetDetailDaycare(
    {
      id,
    },
    { enabled: session.status === "authenticated" }
  );

  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false })
  );

  return (
    <>
      <div className="space-y-8">
        <div className="space-y-3">
          <Card key={data?.data.id}>
            <CardContent className="p-4 space-y-3">
              <Image
                src={`${baseUrl}/${data?.data.images}`}
                alt={data?.data.name ?? ""}
                width={1000}
                height={1000}
                className="w-[100px] h-[100px] object-cover w-fit rounded-full bg-[#EED584]/60"
              />
              <div className="space-y-2">
                <h1 className="font-semibold">{data?.data.name}</h1>
                <p className="text-muted-foreground line-clamp-2">
                  {data?.data.description}
                </p>
                <p>Buka setiap hari {data?.data.opening_days}</p>
              </div>
              <div className="flex items-center space-x-2">
                <RatingStars rating={data?.data.rating || 0} />{" "}
                <span className="text-sm text-muted-foreground">
                  ({data?.data.reviewers_count})
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <Tabs defaultValue="nannies">
            <TabsList>
              <TabsTrigger value="nannies">Nannies</TabsTrigger>
              <TabsTrigger value="facilities">Facilities</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="nannies">
              <div className="py-2">
                <Carousel
                  plugins={[plugin.current]}
                  className="w-full"
                  onMouseEnter={plugin.current.stop}
                  onMouseLeave={plugin.current.reset}
                >
                  <CarouselContent>
                    {data?.data?.nannies?.map((nanny) => (
                      <CarouselItem
                        key={nanny.id}
                        className="px-3 md:basis-1/2 lg:basis-1/3"
                      >
                        <div className="p-1">
                          <Card>
                            <CardContent className="p-4 space-y-4">
                              <div className="flex gap-4 items-center">
                                <Image
                                  src={`${baseUrl}/${nanny.images}`}
                                  alt={nanny.name ?? ""}
                                  width={1000}
                                  height={1000}
                                  className="w-[60px] h-[60px] object-cover w-fit rounded-full bg-[#EED584]/60"
                                />
                                <div>
                                  <h1 className="font-medium">
                                    {nanny?.user.name}
                                  </h1>
                                  <p className="text-muted-foreground text-sm">
                                    Nannies
                                  </p>
                                </div>
                              </div>
                              <div>
                                <hr />
                              </div>
                              <div className="space-y-1">
                                <p className="font-semibold text-sm">
                                  Description Experience
                                </p>
                                <p className="text-muted-foreground line-clamp-2 text-sm">
                                  {nanny?.experience_description}
                                </p>
                              </div>
                              <div>
                                <hr />
                              </div>
                              <div className="flex gap-4">
                                <div className="flex gap-2">
                                  <div>
                                    <Phone className="h-4 w-4 text-muted-foreground" />
                                  </div>
                                  <div className="space-y-1">
                                    <h1 className="font-medium text-sm">
                                      {nanny.contact}
                                    </h1>
                                  </div>
                                </div>
                                <div className="flex gap-2">
                                  <div>
                                    <CircleDollarSign className="h-4 w-4 text-muted-foreground" />
                                  </div>
                                  <div className="space-y-1">
                                    <h1 className="font-medium text-sm line-clamp-1">
                                      {nanny.price_half} - {nanny.price_full}
                                    </h1>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
              </div>
            </TabsContent>
            <TabsContent value="facilities">
              <div className="py-2">
                {data?.data.facility_images && data.data.facility_images ? (
                  <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
                    {data.data.facility_images.map((facility) => (
                      <Image
                        src={`${baseUrl}/${facility.image_url}`}
                        alt={data?.data.name ?? ""}
                        width={1000}
                        height={1000}
                        className="w-[600px] h-[300px] object-cover rounded-md"
                        key={facility.id}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">Belum ada review.</p>
                )}
              </div>
            </TabsContent>
            <TabsContent value="reviews">
              <div className="py-2">
                {data?.data?.reviews && data.data.reviews.length > 0 ? (
                  <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
                    {data.data.reviews.map((review) => (
                      <Card key={review.id} className="">
                        <CardContent className="p-4">
                          <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                              <Avatar className="border border-muted">
                                <AvatarFallback className="text-gray-700">
                                  {generateFallbackFromName(review.user.name)}
                                </AvatarFallback>
                              </Avatar>
                              <p className="font-medium">{review.user.name}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RatingStars rating={review.rating} />{" "}
                            </div>
                            <p>{review.comment}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(review.created_at).toLocaleDateString(
                                "id-ID"
                              )}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">Belum ada review.</p>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
