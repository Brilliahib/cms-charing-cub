"use client";

import RatingStars from "@/components/atoms/rating/RatingStar";
import SectionTitle from "@/components/atoms/typography/SectionTitle";
import { Card, CardContent } from "@/components/ui/card";
import { useGetAllDaycare } from "@/http/daycares/get-all-daycares";
import { baseUrl } from "@/utils/app";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CubLocationContent() {
  const { data, isPending } = useGetAllDaycare();

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (!data?.data || data.data.length === 0) {
    return <p>No daycares available</p>;
  }
  return (
    <>
      <div className="mx-auto px-4 max-w-[1400px]">
        <div className="md:space-y-8 space-y-4">
          <SectionTitle
            title="Cub Location"
            subtitle="Find Your Daycare In Here"
          />
          <div className="grid md:grid-cols-4">
            {data.data.map((daycare) => (
              <Link href={`/cub-location/${daycare.id}`} key={daycare.id}>
                <Card className="border-0 shadow-none">
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      <Image
                        src={`${baseUrl}/${daycare.facility_images[0].image_url}`}
                        alt={daycare.name}
                        width={1000}
                        height={1000}
                        className="w-full object-cover md:h-full rounded-xl"
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
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
