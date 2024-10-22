"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { useGetAllDaycare } from "@/http/daycares/get-all-daycares";
import { baseUrl } from "@/utils/app";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function DaycareList() {
  const { data, isPending } = useGetAllDaycare();
  return (
    <>
      <div className="mx-auto px-4 max-w-[1400px] md:py-24 py-16">
        <div className="grid md:grid-cols-4 grid-cols-1 md:gap-8 gap-4">
          {data?.data.map((daycare) => (
            <Card className="relative overflow-hidden shadow-lg border-0">
              <CardContent className="p-6">
                <CardTitle>
                  <div className="p-5 bg-gradient-to-tr from-primary flex justify-center to-secondary rounded-xl">
                    <Image
                      src={`${baseUrl}/${daycare.images}`}
                      alt={daycare.name}
                      width={1000}
                      height={1000}
                      className="max-h-[100px] w-fit"
                    />
                  </div>
                </CardTitle>
                <div className="mt-6">
                  <h1 className="font-bold">{daycare.name}</h1>
                  <p className="text-muted-foreground line-clamp-2">
                    {daycare.description}
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">See Details</Button>
              </CardFooter>
              <div className="absolute -bottom-10 left-0 h-52 w-60 rotate-45 rounded-full bg-gradient-to-r from-primary/30 to-secondary/30 blur-lg"></div>
              <div className="absolute -top-10 right-0 h-52 w-60 rotate-45 rounded-full bg-gradient-to-r from-primary/30 to-secondary/30 blur-lg"></div>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
