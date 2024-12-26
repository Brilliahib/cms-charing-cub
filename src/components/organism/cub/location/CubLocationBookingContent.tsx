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
      <div className="pad-x py-8 space-y-8">
        <div className="flex md:flex-row flex-col gap-6">
          <div className="space-y-4 md:space-y-6 w-full">
            <div className="space-y-2">
              <h1 className="text-xl font-bold">Booking Form</h1>
              <p className="text-muted-foreground">
                Complete the following form to make a booking
              </p>
            </div>
            <div></div>
          </div>
          <div className="space-y-4 md:space-y-6 max-w-sm">
            <Card className="border shadow">
              <CardContent className="p-6 md:p-8">
                <div className="md:space-y-6 space-y-4">
                  <h1 className="text-xl font-bold">Review Order Details</h1>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 md:gap-6 overflow-x-auto flex-nowrap no-scrollbar">
                      {data?.data.facility_images?.map((facilitiesImage) => (
                        <Image
                          src={`${baseUrl}/${facilitiesImage.image_url}`}
                          alt={data?.data.name ?? "Daycare"}
                          width={1000}
                          height={1000}
                          className="w-[250px] object-cover h-[200px] rounded-lg"
                          key={facilitiesImage.id}
                        />
                      ))}
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h1 className="md:text-2xl text-xl font-bold">
                          {data?.data.name}
                        </h1>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RatingStars rating={data?.data.rating || 0} />{" "}
                        <span className="text-sm text-muted-foreground">
                          ({data?.data.reviewers_count})
                        </span>
                      </div>
                      <div className="space-y-4 text-muted-foreground text-sm">
                        <div className="flex gap-2">
                          <MapPin className="h-5 w-5   flex-shrink-0" />
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
                </div>
              </CardContent>
            </Card>
            <Card className="border shadow">
              <CardContent className="md:p-6 p-4">
                <div className="md:space-y-6 space-y-4">
                  <div>
                    <h1 className="text-xl font-bold">Payment Details</h1>
                  </div>
                  <div className="flex items-center justify-between">
                    <h1 className="text-muted-foreground text-sm">Bank Name</h1>
                    <h1 className="font-bold">BRI</h1>
                  </div>
                  <div className="flex items-center justify-between">
                    <h1 className="text-muted-foreground text-sm">
                      Bank Account
                    </h1>
                    <h1 className="font-bold">{data?.data.name}</h1>
                  </div>
                  <div className="flex items-center justify-between">
                    <h1 className="text-muted-foreground text-sm">
                      Bank Number
                    </h1>
                    <h1 className="font-bold">34048374530</h1>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
