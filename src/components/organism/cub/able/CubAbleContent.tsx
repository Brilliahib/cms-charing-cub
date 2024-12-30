"use client";

import RatingStars from "@/components/atoms/rating/RatingStar";
import SearchInput from "@/components/atoms/search/SearchInput";
import SectionTitle from "@/components/atoms/typography/SectionTitle";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAllDaycareDisability } from "@/http/daycares/get-all-daycare-disability";
import { baseUrl } from "@/utils/app";
import { MapPin, Settings2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function CubAbleContent() {
  const { data, isPending } = useGetAllDaycareDisability();
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
    <>
      <div className="pad-x lg:pt-8 md:pt-6 pt-4">
        <div className="space-y-8">
          <SectionTitle
            title="Cub Able"
            subtitle="Daycare for Children with Disabilities"
          />
          <div className="flex items-center gap-4">
            <SearchInput
              onSearch={onSearch}
              props="Search Daycare"
              className="md:max-w-[250px] w-full"
            />
            <Button variant={"outline"}>
              <Settings2 /> <p className="md:flex hidden">Tambah Filter</p>
            </Button>
          </div>
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
              <p>Belum ada daycare yang tersedia menerima kebutuhan khusus.</p>
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
                          <div className="flex items-center space-x-2">
                            <RatingStars rating={daycare.rating || 0} />{" "}
                            <span className="text-sm text-muted-foreground">
                              ({daycare.reviewers_count})
                            </span>
                          </div>
                          <div className="flex gap-2 items-center text-muted-foreground">
                            <MapPin className="h-4 w-4 flex-shrink-0" />
                            <p className="line-clamp-1 text-sm">
                              {daycare.location}
                            </p>
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
    </>
  );
}
