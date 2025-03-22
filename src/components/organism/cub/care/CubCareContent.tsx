"use client";

import RatingStars from "@/components/atoms/rating/RatingStar";
import SearchInput from "@/components/atoms/search/SearchInput";
import SectionTitle from "@/components/atoms/typography/SectionTitle";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAllNannies } from "@/http/cub/care/get-all-nannies";
import { baseUrl } from "@/utils/app";
import { formatPrice } from "@/utils/price";
import { Settings2, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function CubCareContent() {
  const { data, isPending } = useGetAllNannies();

  const [query, setQuery] = useState("");

  const onSearch = (value: string) => {
    setQuery(value);
  };

  return (
    <div className="pad-x-xl lg:pt-8 md:pt-6 pt-4">
      <div className="space-y-8">
        <SectionTitle
          title="Cub Care"
          subtitle="Connecting Your Child With Loving Nannies"
        />
        <div className="flex items-center gap-4">
          <SearchInput
            onSearch={onSearch}
            props="Search Nanny"
            className="md:max-w-[250px] w-full"
          />
          <Button variant={"outline"}>
            <Settings2 /> <p className="md:flex hidden">Tambah Filter</p>
          </Button>
        </div>
        <div className="grid md:grid-cols-4 grid-cols-1 md:gap-8 gap-4">
          {isPending ? (
            Array.from({ length: 4 }).map((_, index) => (
              <Card key={index}>
                <CardContent className="p-0">
                  <div className="space-y-4">
                    <Skeleton className="w-full h-[200px] rounded-xl" />
                    <div className="space-y-2">
                      <Skeleton className="h-6 w-full" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : !data?.data || data.data.length === 0 ? (
            <p>Nanny belum tersedia.</p>
          ) : (
            data.data.map((nannies) => (
              <Link key={nannies.id} href={`/cub-care/${nannies.id}`}>
                <Card className="border-0 shadow-none">
                  <CardContent className="p-0">
                    <div className="flex flex-col space-y-4">
                      <div className="relative p-0 bg-secondary rounded-xl">
                        {/* image doctor */}
                        <Image
                          src={`${baseUrl}/${nannies.images}`}
                          alt={nannies.name}
                          width={1000}
                          height={1000}
                          className="w-fit object-cover h-[200px] rounded-xl mx-auto"
                        />
                        <Image
                          src={`${baseUrl}/${nannies.daycare?.images}`}
                          alt={`${nannies.daycare?.name} Logo`}
                          width={50}
                          height={50}
                          className="absolute top-2 right-4 w-10 h-10 rounded-full object-cover border border-white shadow-lg"
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <h1 className="font-bold">{nannies.user.name}</h1>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RatingStars rating={nannies.daycare?.rating || 0} />{" "}
                          <span className="text-sm text-muted-foreground">
                            ({nannies.daycare?.reviewers_count})
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
