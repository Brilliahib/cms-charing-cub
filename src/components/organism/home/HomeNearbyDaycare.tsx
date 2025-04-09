"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useGetAllDaycare } from "@/http/daycares/get-all-daycares";
import { baseUrl } from "@/utils/app";
import Image from "next/image";
import Link from "next/link";

export default function HomeNearbyDaycare() {
  const { data, isPending } = useGetAllDaycare();

  return (
    <>
      <div className="pad-x md:pt-24 pt-16 space-y-12">
        <div className="md:w-[70rem] w-fit">
          <h1 className="font-bold tracking-tighter text-3xl sm:text-5xl text-zinc-700 relative z-10">
            Nearby Daycare🤝
          </h1>
          <span className="md:w-[20rem] w-[10rem] h-[2rem] bg-gradient-to-r from-purple-500 to-purple-100 absolute -rotate-2 -translate-y-7 z-0 opacity-30"></span>
        </div>

        <div className="grid md:grid-cols-4 grid-cols-1 gap-6 md:gap-6">
          {isPending
            ? Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="space-y-2">
                  <Skeleton className="h-[200px] w-full md:w-[270px] rounded-xl" />
                  <Skeleton className="h-[20px] w-3/4" />
                  <Skeleton className="h-[16px] w-1/2" />
                </div>
              ))
            : data?.data.map((daycare) => (
                <Link
                  href={`/daycares/${daycare.id}`}
                  key={daycare.id}
                  className="space-y-2 hover:-translate-y-1 transition-transform duration-300 ease-in-out"
                >
                  <Image
                    src={`${baseUrl}/${daycare.facility_images[0].image_url}`}
                    alt={daycare.name}
                    width={1000}
                    height={1000}
                    className="h-[180px] md:w-full w-full object-cover rounded-xl"
                  />
                  <div className="space-y-1">
                    <h1 className="font-semibold md:text-md text-base line-clamp-2">
                      {daycare.name}
                    </h1>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {daycare.location}
                    </p>
                  </div>
                </Link>
              ))}
        </div>
      </div>
    </>
  );
}
