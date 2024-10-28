"use client";

import RatingStars from "@/components/atoms/rating/RatingStar";
import SearchInput from "@/components/atoms/search/SearchInput";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useGetAllDaycare } from "@/http/daycares/get-all-daycares";
import { baseUrl } from "@/utils/app";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Clock, MapPin, MessageSquareMore } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function DaycareDashboardContent() {
  const { data, isPending } = useGetAllDaycare();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData =
    data?.data.filter((daycare) =>
      daycare.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  return (
    <>
      <div className="py-4 space-y-8">
        <div>
          <SearchInput onSearch={setSearchQuery} />
        </div>
        <div className="grid xl:grid-cols-4 md:grid-cols-3 gap-4">
          {filteredData.map((daycare) => (
            <Card key={daycare.id} className="rounded-xl">
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div className="flex gap-4 items-center">
                    <Image
                      src={`${baseUrl}/${daycare.images}`}
                      alt={daycare.name}
                      width={1000}
                      height={1000}
                      className="w-[60px] h-[60px] object-cover w-fit rounded-full bg-[#EED584]/60"
                    />
                    <div className="space-y-2">
                      <div>
                        <h1 className="font-semibold">{daycare.name}</h1>
                        <p className="text-sm text-muted-foreground">Daycare</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RatingStars rating={daycare.rating} />{" "}
                        <span className="text-xs text-muted-foreground">
                          ({daycare.reviewers_count})
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <hr />
                  </div>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div>
                        <Clock className="h-4 w-4" />
                      </div>
                      <div className="space-y-1">
                        <p className="font-base text-sm text-muted-foreground">
                          Opening Hours
                        </p>
                        <p className="font-medium text-sm">
                          {daycare.opening_days},{" "}
                          {format(
                            new Date(`1970-01-01T${daycare.opening_hours}`),
                            "HH:mm",
                            {
                              locale: id,
                            }
                          )}{" "}
                          -{" "}
                          {format(
                            new Date(`1970-01-01T${daycare.closing_hours}`),
                            "HH:mm",
                            {
                              locale: id,
                            }
                          )}{" "}
                          WIB
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div>
                        <MapPin className="h-4 w-4" />
                      </div>
                      <div className="space-y-1">
                        <p className="font-base text-sm text-muted-foreground">
                          Location
                        </p>
                        <h1 className="font-medium text-sm line-clamp-1">
                          {daycare.location}
                        </h1>
                        <h1 className="text-sm line-clamp-1">
                          ({daycare.location_tracking})
                        </h1>
                      </div>
                    </div>
                  </div>
                  <div>
                    <hr />
                  </div>
                  <div className="flex gap-4">
                    <Button variant={"outline"} className="w-full">
                      <MessageSquareMore className="h-4 w-4" />
                      Message
                    </Button>
                    <Button className="w-full">Book Now</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
