"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useGetAllDaycare } from "@/http/daycares/get-all-daycares";
import { baseUrl } from "@/utils/app";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import Image from "next/image";

export default function CubLocationContent() {
  const { data, isPending } = useGetAllDaycare();
  return (
    <>
      <div className="mx-auto px-4 max-w-[1400px]">
        <div className="grid md:grid-cols-2 grid-cols-1 md:gap-8 gap-6">
          <div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126715.84304949311!2d110.33466416073549!3d-7.024552227648474!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e708b4d3f0d024d%3A0x1e0432b9da5cb9f2!2sSemarang%2C%20Semarang%20City%2C%20Central%20Java!5e0!3m2!1sen!2sid!4v1729604468641!5m2!1sen!2sid"
              width="100%"
              height="450"
              loading="lazy"
              className="rounded-xl"
            ></iframe>
          </div>
          <div>
            <div className="relative p-[3px] bg-gradient-to-r from-[#7E5CBE] via-[#79919A] to-[#EED584] rounded-xl">
              <Card className="shadow-lg border-0">
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div className="py-2 px-8 bg-primary w-fit rounded-full">
                      <h1 className="text-white font-bold">Nearest Daycares</h1>
                    </div>
                    <div className="space-y-4">
                      {data?.data.map((daycare) => (
                        <div key={daycare.id} className="flex gap-4 md:gap-6">
                          <div className="p-5 bg-gradient-to-tr from-primary flex justify-center to-secondary rounded-xl">
                            <Image
                              src={`${baseUrl}/${daycare.images}`}
                              alt={daycare.name}
                              width={1000}
                              height={1000}
                              className="max-h-[50px] w-fit"
                            />
                          </div>
                          <div>
                            <h1 className="font-bold">{daycare.name}</h1>
                            <p className="text-muted-foreground">
                              {daycare.opening_days}
                            </p>
                            <p className="text-muted-foreground">
                              {daycare.opening_hours
                                ? format(
                                    new Date(
                                      `1970-01-01T${daycare.opening_hours}`
                                    ),
                                    "HH:mm",
                                    {
                                      locale: id,
                                    }
                                  )
                                : "Invalid time"}{" "}
                              -
                              {daycare.closing_hours
                                ? format(
                                    new Date(
                                      `1970-01-01T${daycare.closing_hours}`
                                    ),
                                    "HH:mm",
                                    {
                                      locale: id,
                                    }
                                  )
                                : "Invalid time"}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
