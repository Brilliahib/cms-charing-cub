"use client";

import RatingStars from "@/components/atoms/rating/RatingStar";
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

  return (
    <div className="mx-auto px-4 max-w-[1400px]">
      <div className="md:space-y-8 space-y-4">
        <SectionTitle
          title="Cub Care"
          subtitle="Connecting Your Child With Loving Nannies"
        />
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
                    <div className="space-y-4">
                      <Image
                        src={`${baseUrl}/${nannies.images}`}
                        alt={nannies.name}
                        width={1000}
                        height={1000}
                        className="w-full object-cover md:h-[200px] h-[150px] rounded-xl bg-primary/60"
                      />
                      <div className="space-y-2">
                        <h1 className="font-bold">{nannies.name}</h1>
                        <div className="flex items-center space-x-2">
                          <RatingStars rating={nannies.rating || 0} />{" "}
                          <span className="text-muted-foreground text-sm">
                            ({nannies.rating_count})
                          </span>
                        </div>
                        <p className="text-muted-foreground">
                          {formatPrice(nannies.price_full)}
                        </p>
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
