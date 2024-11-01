"use client";

import RatingStars from "@/components/atoms/rating/RatingStar";
import SectionTitle from "@/components/atoms/typography/SectionTitle";
import { Card, CardContent } from "@/components/ui/card";
import { useGetAllDaycare } from "@/http/daycares/get-all-daycares";
import { baseUrl } from "@/utils/app";
import { MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

export default function CubLocationContent() {
  const { data, isPending } = useGetAllDaycare();

  return (
    <div className="mx-auto px-4 max-w-[1400px]">
      <div className="md:space-y-8 space-y-4">
        <SectionTitle
          title="Cub Location"
          subtitle="Find Your Daycare In Here"
        />
        <div className="grid md:grid-cols-4 grid-cols-1 md:gap-6 gap-4">
          {isPending ? (
            Array.from({ length: 4 }).map((_, index) => (
              <Card className="border-0 shadow-none" key={index}>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <Skeleton className="w-full h-[200px] rounded-xl" />
                    <div className="space-y-2">
                      <Skeleton className="h-6 w-full" />
                      <div className="flex gap-2 items-center">
                        <MapPin className="h-4 w-4" />
                        <Skeleton className="h-4 w-3/4" />
                      </div>
                      <div className="flex items-center space-x-2">
                        <RatingStars rating={0} />
                        <Skeleton className="h-4 w-1/4" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : !data?.data ||
            data.data.length === 0 ||
            !Array.isArray(data.data) ? (
            <p>No daycares available</p>
          ) : (
            data.data.map((daycare) => (
              <Link href={`/cub-location/${daycare.id}`} key={daycare.id}>
                <Card className="border-0 shadow-none">
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      <Image
                        src={`${baseUrl}/${daycare.facility_images[0].image_url}`}
                        alt={daycare.name}
                        width={1000}
                        height={1000}
                        className="w-full object-cover md:h-[200px] rounded-xl"
                      />
                      <div className="space-y-2">
                        <h1 className="font-bold">{daycare.name}</h1>
                        <div className="flex gap-2 items-center">
                          <MapPin className="h-8 w-8" />
                          <p className="line-clamp-1 text-sm">
                            {daycare.location}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RatingStars rating={daycare.rating || 0} />{" "}
                          <span className="text-sm text-muted-foreground">
                            ({daycare.reviewers_count})
                          </span>
                        </div>
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
  );
}
