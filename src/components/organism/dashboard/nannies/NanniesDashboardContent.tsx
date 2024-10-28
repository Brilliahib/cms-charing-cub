"use client";

import DialogBookingNannies from "@/components/atoms/dialog/DialogBookingNannies";
import SearchInput from "@/components/atoms/search/SearchInput";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useGetAllNannies } from "@/http/cub/care/get-all-nannies";
import { baseUrl } from "@/utils/app";
import { HousePlus, MapPin, MessageSquareMore } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function NanniesDashboardContent() {
  const { data, isPending } = useGetAllNannies();
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedNannyName, setSelectedNannyName] = useState<string>("");
  const [selectedNannyId, setSelectedNannyId] = useState<number | null>(null);

  const filteredData =
    data?.data.filter((nanny) =>
      nanny.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  const handleBookNow = (nannyId: number, nannyName: string) => {
    setSelectedNannyId(nannyId);
    setSelectedNannyName(nannyName);
    setIsDialogOpen(true);
  };

  return (
    <>
      <div className="py-8 space-y-8">
        <div>
          <SearchInput onSearch={setSearchQuery} />
        </div>
        <div className="grid xl:grid-cols-4 md:grid-cols-3 gap-4">
          {filteredData.map((nanny) => (
            <Card key={nanny.id} className="rounded-xl">
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div className="flex gap-4 items-center">
                    <Image
                      src={`${baseUrl}/${nanny.images}`}
                      alt={nanny.name}
                      width={1000}
                      height={1000}
                      className="w-[60px] h-[60px] object-cover w-fit rounded-full bg-[#EED584]/60"
                    />
                    <div>
                      <h1 className="font-medium">{nanny.name}</h1>
                      <p className="text-sm text-muted-foreground">Nannies</p>
                    </div>
                  </div>
                  <div>
                    <hr />
                  </div>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div>
                        <HousePlus className="h-4 w-4" />
                      </div>
                      <div className="space-y-1">
                        <p className="font-base text-sm text-muted-foreground">
                          Daycare
                        </p>
                        <h1 className="font-medium text-sm">
                          {nanny.daycare_name}
                        </h1>
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
                          {nanny.daycare_location}
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
                    <Button
                      className="w-full"
                      onClick={() => handleBookNow(nanny.id, nanny.name)}
                    >
                      Book Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      {isDialogOpen && (
        <DialogBookingNannies
          open={isDialogOpen}
          id={selectedNannyId as number}
          setOpen={setIsDialogOpen}
          name={selectedNannyName}
        />
      )}
    </>
  );
}
