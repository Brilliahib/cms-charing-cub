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
import SearchInput from "@/components/atoms/search/SearchInput";
import { useState } from "react";

export default function CubLocationContent() {
  const { data, isPending } = useGetAllDaycare();
  const [query, setQuery] = useState("");

  const onSearch = (value: string) => {
    setQuery(value);
  };

  const filteredDaycares = Array.isArray(data?.data)
    ? data.data.filter((daycare) =>
        daycare.name.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="pad-x lg:pt-8 md:pt-6 pt-4">
      <div className="space-y-8">
        <SectionTitle
          title="Cub Location"
          subtitle="Find Your Daycare In Here"
        />
        <SearchInput
          onSearch={onSearch}
          props="Search Daycare"
          className="min-w-[250px]"
        />
        <div className="grid md:grid-cols-4 grid-cols-1 md:gap-8 gap-10">
          {isPending ? (
            Array.from({ length: 4 }).map((_, index) => (
              <Card className="border-0 shadow-none" key={index}>
                <CardContent className="p-0">
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
          ) : !filteredDaycares || filteredDaycares.length === 0 ? (
            <p>No daycares available</p>
          ) : (
            filteredDaycares.map((daycare) => (
              <Link href={`/cub-location/${daycare.id}`} key={daycare.id}>
                <Card className="border-0 shadow-none">
                  <CardContent className="p-0">
                    <div className="flex flex-col space-y-4">
                      <Image
                        src={`${baseUrl}/${daycare.facility_images[0].image_url}`}
                        alt={daycare.name}
                        width={1000}
                        height={1000}
                        className="w-full object-cover h-[200px] rounded-xl"
                      />
                      <div className="md:space-y-2">
                        <h1 className="font-bold">{daycare.name}</h1>
                        <div className="flex gap-2 items-center text-muted-foreground">
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
