"use client";

import RatingStars from "@/components/atoms/rating/RatingStar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useGetDetailDaycare } from "@/http/daycares/get-detail-daycare";
import { baseUrl } from "@/utils/app";
import { BadgeCheck, Clock, MapPin, Phone } from "lucide-react";
import Image from "next/image";

interface CubLocationBookingParams {
  id: number;
}

export default function CubLocationBookingContent({
  id,
}: CubLocationBookingParams) {
  const { data, isPending } = useGetDetailDaycare({ id });
  return (
    <>
      <div className="mx-auto px-4 max-w-[1400px]">
        <div className="grid md:grid-cols-2 grid-cols-1 md:gap-8 gap-6">
          <div>
            <Card>
              <CardContent className="p-6 md:p-8">
                <div className="space-y-4">
                  <Image
                    src={`${baseUrl}/${data?.data.facility_images[0].image_url}`}
                    alt={data?.data.name ?? ""}
                    width={1000}
                    height={1000}
                    className="w-full object-cover md:h-full rounded-xl"
                  />
                  <div className="space-y-4">
                    <div>
                      <h1 className="md:text-3xl text-xl font-paytone">
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
                        <MapPin className="h-5 w-5 md:flex hidden" />
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
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="space-y-4 md:space-y-6">
            <div className="space-y-4">
              <Card>
                <CardContent className="md:p-6 p-4">
                  <div className="md:space-y-6 space-y-4">
                    <div>
                      <h1 className="text-xl font-paytone">Payment</h1>
                    </div>
                    <div className="flex items-center justify-between">
                      <h1 className="text-muted-foreground font-semibold text-sm">
                        Bank Name
                      </h1>
                      <h1 className="font-bold">BRI</h1>
                    </div>
                    <div className="flex items-center justify-between">
                      <h1 className="text-muted-foreground font-semibold text-sm">
                        Bank Account
                      </h1>
                      <h1 className="font-bold">{data?.data.name}</h1>
                    </div>
                    <div className="flex items-center justify-between">
                      <h1 className="text-muted-foreground font-semibold text-sm">
                        Bank Number
                      </h1>
                      <h1 className="font-bold">34048374530</h1>
                    </div>
                    <div className="bg-secondary rounded-xl p-4 space-y-4">
                      <h1 className="font-bold">The benefit you get</h1>
                      <ul className="space-y-4 text-sm">
                        <li>
                          <div className="flex gap-4 items-center">
                            <BadgeCheck className="text-green-500" />
                            <p>Safe and Comfortable Environment</p>
                          </div>
                        </li>
                        <li>
                          <div className="flex gap-4 items-center">
                            <BadgeCheck className="text-green-500" />
                            <p>Early Learning and Development Programs</p>
                          </div>
                        </li>
                        <li>
                          <div className="flex gap-4 items-center">
                            <BadgeCheck className="text-green-500" />
                            <p>Socialization and Interaction</p>
                          </div>
                        </li>
                        <li>
                          <div className="flex gap-4 items-center">
                            <BadgeCheck className="text-green-500" />
                            <p>Clean and Hygienic Environment</p>
                          </div>
                        </li>
                        <li>
                          <div className="flex gap-4 items-center">
                            <BadgeCheck className="text-green-500" />
                            <p>Trained and Experienced Staff</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="space-y-4">
              <Card>
                <CardContent className="md:p-6 p-4">
                  <div className="md:space-y-6 space-y-4">
                    <div>
                      <h1 className="font-paytone text-xl">
                        Booking Information
                      </h1>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
