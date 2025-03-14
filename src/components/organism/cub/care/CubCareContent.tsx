"use client";

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
        <div className="grid md:grid-cols-3 grid-cols-1 md:gap-8 gap-4">
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
                <Card>
                  <CardContent className="p-4 shadow border rounded-xl space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-4">
                        <Image
                          src={`${baseUrl}/${nannies.images}`}
                          alt={nannies.name}
                          width={1000}
                          height={1000}
                          className="w-[100px] bg-secondary h-[100px] rounded-full"
                        />
                        <div className="text-base space-y-2">
                          {nannies.daycare?.rating ? (
                            <div className="w-fit flex gap-1 items-center text-sm bg-secondary px-3 py-1 rounded-full font-semibold">
                              <Star
                                className="h-4 w-4 text-yellow-500"
                                fill="currentColor"
                              />
                              {nannies.daycare.rating}
                            </div>
                          ) : null}

                          <div>
                            <h1 className="font-semibold">
                              {nannies.user.name}
                            </h1>
                            <p className="text-muted-foreground">
                              {nannies.daycare?.name ??
                                "Tidak Memiliki Daycare"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <Button className="w-full">Lihat Detail</Button>
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
