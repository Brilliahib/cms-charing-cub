"use client";

import RatingStars from "@/components/atoms/rating/RatingStar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetDetailDaycare } from "@/http/daycares/get-detail-daycare";
import { baseUrl } from "@/utils/app";
import { generateFallbackFromName } from "@/utils/misc";
import { formatPrice } from "@/utils/price";
import { Clock, MapPin, Phone } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState, useEffect } from "react";

interface DaycareDetailProps {
  id: number;
}

export default function CubLocationDetailContent({ id }: DaycareDetailProps) {
  const session = useSession();
  const { data, isPending } = useGetDetailDaycare({ id });

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    if (data?.data.facility_images?.length) {
      setPreviewImage(`${baseUrl}/${data.data.facility_images[0].image_url}`);
    }
  }, [data]);

  const handleImageClick = (imageUrl: string) => {
    setPreviewImage(`${baseUrl}/${imageUrl}`);
  };

  return (
    <div className="mx-auto px-4 max-w-[1400px]">
      <div className="space-y-4 md:space-y-12">
        <Card>
          <CardContent className="md:p-8 p-4">
            <div className="md:flex gap-4 xl:max-h-[500px] md:max-h-[500px]">
              {/* Preview image */}
              <div className="md:w-8/12">
                <Image
                  src={previewImage ?? ""}
                  alt={data?.data.name ?? ""}
                  width={1000}
                  height={1000}
                  className="w-full object-cover md:h-full rounded-xl"
                />
              </div>

              {/* List images */}
              <div className="md:w-4/12">
                <ScrollArea className="h-[500px]">
                  <div className="space-y-4 md:block flex">
                    {data?.data.facility_images?.map((facilityImage) => (
                      <Image
                        key={facilityImage.id}
                        src={`${baseUrl}/${facilityImage.image_url}`}
                        alt={data?.data.name ?? "Daycare Facility"}
                        width={1000}
                        height={1000}
                        className="object-cover w-full flex-1 cursor-pointer rounded-xl"
                        onClick={() =>
                          handleImageClick(facilityImage.image_url)
                        }
                      />
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="md:flex gap-4 md:gap-8">
          <div className="w-8/12">
            <Card>
              <CardContent className="md:p-8 p-4">
                <div className="space-y-4 md:space-y-8">
                  <div className="space-y-4">
                    <div>
                      <h1 className="font-bold md:text-3xl text-xl">
                        {data?.data.name}
                      </h1>
                    </div>
                    <div className="flex gap-4 md:gap-8">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-5 w-5" />
                        <p>{data?.data.location}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5" />
                        <p>{data?.data.opening_days}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-5 w-5" />
                        <p>{data?.data.phone_number}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RatingStars rating={data?.data.rating || 0} />{" "}
                      <span className="text-sm text-muted-foreground">
                        ({data?.data.reviewers_count})
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h1 className="font-bold">About Daycare</h1>
                    <p className="text-muted-foreground">
                      {data?.data.description}
                    </p>
                  </div>
                  <div className="space-y-4">
                    <h1 className="font-bold">Our Nannies</h1>
                    <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
                      {data?.data.nannies ? (
                        data?.data.nannies.map((nannies) => (
                          <Card
                            className="bg-secondary border-0"
                            key={nannies.id}
                          >
                            <CardContent className="p-4 flex flex-col justify-between h-full">
                              <div className="space-y-4">
                                <Image
                                  src={`${baseUrl}/${nannies.images}`}
                                  alt={nannies.name}
                                  width={1000}
                                  height={1000}
                                  className="object-cover w-full flex-1 rounded-xl"
                                />
                              </div>
                            </CardContent>
                          </Card>
                        ))
                      ) : (
                        <p>No nannies available</p>
                      )}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h1 className="font-bold">From Happy Customer</h1>
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                      {data?.data.reviews?.map((review) => (
                        <Card className="bg-secondary border-0" key={review.id}>
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
                                  {generateFallbackFromName(review.user.name)}
                                </AvatarFallback>
                              </Avatar>
                              <p className="font-semibold text-sm">
                                {review.user.name}
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="w-4/12">
            <Card>
              <CardContent className="md:p-8 p-4">
                <div className="space-y-4">
                  <div className="space-y-4">
                    <h1 className="font-bold">Start from</h1>
                    <div>
                      <h1 className="text-3xl font-bold">
                        {formatPrice(data?.data.price || 0)}
                        <span className="text-sm font-normal">/day</span>
                      </h1>
                    </div>
                  </div>
                  <div>
                    <Button className="w-full rounded-full" size={"lg"}>
                      Book Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
