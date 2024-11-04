"use client";

import RatingStars from "@/components/atoms/rating/RatingStar";
import SearchInput from "@/components/atoms/search/SearchInput";
import SectionTitle from "@/components/atoms/typography/SectionTitle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAllNannies } from "@/http/cub/care/get-all-nannies";
import { baseUrl } from "@/utils/app";
import { formatPrice } from "@/utils/price";
import { CircleDollarSign, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function CubCareContent() {
  const { data, isPending } = useGetAllNannies();

  const [query, setQuery] = useState("");

  const onSearch = (value: string) => {
    setQuery(value);
  };

  const filteredNannies = data?.data?.filter((nannies) =>
    nannies.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="mx-auto px-4 max-w-[1400px]">
      <div className="space-y-8">
        <SectionTitle
          title="Cub Care"
          subtitle="Connecting Your Child With Loving Nannies"
        />
        <SearchInput onSearch={onSearch} />
        <div className="grid md:grid-cols-4 grid-cols-1 md:gap-8 gap-4">
          {isPending ? (
            Array.from({ length: 4 }).map((_, index) => (
              <Card key={index}>
                <CardContent className="p-4">
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
            <p>No nannies available</p>
          ) : (
            data.data.map((nannies) => (
              <Link key={nannies.id} href={`/cub-care/${nannies.id}`}>
                <Card>
                  <CardContent className="p-4">
                    <div className="space-y-4 flex md:flex-col flex-row md:gap-0 gap-4">
                      <Image
                        src={`${baseUrl}/${nannies.images}`}
                        alt={nannies.name}
                        width={1000}
                        height={1000}
                        className="md:w-full w-[150px] object-cover md:h-[200px] h-[150px] rounded-xl bg-primary/60"
                      />
                      <div className="space-y-2">
                        <h1 className="font-bold">{nannies.name}</h1>
                        <p className="text-muted-foreground">
                          {formatPrice(nannies.price_full)}
                        </p>
                        <div className="flex justify-between">
                          <div className="flex items-center space-x-2">
                            <RatingStars rating={nannies.rating || 0} />{" "}
                            <span className="text-muted-foreground text-sm">
                              ({nannies.rating_count})
                            </span>
                          </div>
                          <div>
                            <Image
                              src={`${baseUrl}/${nannies.daycare_profile}`}
                              alt={nannies.daycare_name}
                              width={1000}
                              height={1000}
                              className="w-[30px] object-cover h-[30px] rounded-full"
                            />
                          </div>
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
