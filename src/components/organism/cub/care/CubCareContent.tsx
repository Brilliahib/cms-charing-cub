"use client";

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
import { CircleDollarSign, Clock } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function CubCareContent() {
  const { data, isPending } = useGetAllNannies();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredNannies = data?.data.filter((nanny) =>
    nanny.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <>
      <div>
        <div
          style={{
            backgroundImage: `url('/images/background-2.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="md:min-h-[400px] min-h-[200px] flex items-center justify-center"
        >
          <div className="text-center text-white space-y-4 md:w-[600px]">
            <div className="space-y-2">
              <h1 className="font-bold md:text-4xl text-2xl">Cub Care</h1>
              <p className="md:text-xl">Search Nannies Easy and Fast</p>
            </div>
            <div className="text-black flex w-full">
              <div>
                <Select>
                  <SelectTrigger className="w-[150px] rounded-r-none font-semibold">
                    <SelectValue placeholder="All Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Location</SelectLabel>
                      <SelectItem value="apple">Semarang</SelectItem>
                      <SelectItem value="banana">Surabaya</SelectItem>
                      <SelectItem value="blueberry">Yogyakarta</SelectItem>
                      <SelectItem value="grapes">Jakarta</SelectItem>
                      <SelectItem value="pineapple">Bekasi</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <Input
                className="rounded-l-none"
                placeholder="Search nannies..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto px-4 max-w-[1400px] py-12">
        <div className="md:flex gap-4 w-full">
          <div className="w-[400px] md:inline hidden">
            <Card>
              <CardContent className="p-4 space-y-10">
                <div className="space-y-4">
                  <div>
                    <h1 className="font-semibold">City</h1>
                  </div>
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <Checkbox />
                      <label
                        htmlFor="terms"
                        className="text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Semarang
                      </label>
                    </div>
                    <div className="flex gap-2">
                      <Checkbox />
                      <label
                        htmlFor="terms"
                        className="text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Surabaya
                      </label>
                    </div>
                    <div className="flex gap-2">
                      <Checkbox />
                      <label
                        htmlFor="terms"
                        className="text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Yogyakarta
                      </label>
                    </div>
                    <div className="flex gap-2">
                      <Checkbox />
                      <label
                        htmlFor="terms"
                        className="text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Jakarta
                      </label>
                    </div>
                    <div className="flex gap-2">
                      <Checkbox />
                      <label
                        htmlFor="terms"
                        className="text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Bekasi
                      </label>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h1 className="font-semibold">City</h1>
                  </div>
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <Checkbox />
                      <label
                        htmlFor="terms"
                        className="text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Semarang
                      </label>
                    </div>
                    <div className="flex gap-2">
                      <Checkbox />
                      <label
                        htmlFor="terms"
                        className="text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Semarang
                      </label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="flex flex-col gap-4 w-full">
            <div>
              <h1 className="font-semibold">Search Nannies</h1>
            </div>
            {isPending
              ? Array.from({ length: 3 }).map((_, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex gap-6">
                        <Skeleton className="h-[125px] w-[125px] rounded-md" />
                        <div className="flex flex-col justify-between w-full">
                          <div className="flex flex-col items-start">
                            <Skeleton className="h-6 w-[150px]" />
                            <Skeleton className="h-4 w-full mt-2" />
                          </div>
                          <div className="flex items-end gap-6">
                            <Skeleton className="h-4 w-[80px]" />
                            <Skeleton className="h-4 w-[100px]" />
                          </div>
                        </div>
                        <div className="md:flex hidden items-end">
                          <Skeleton className="h-8 w-[100px]" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              : filteredNannies?.map((nanny) => (
                  <Card key={nanny.id}>
                    <CardContent className="p-4">
                      <div className="flex gap-6">
                        <div>
                          <Image
                            src={`${baseUrl}/${nanny.images}`}
                            alt={nanny.name}
                            width={1000}
                            height={1000}
                            className="max-h-[125px] w-fit bg-primary/30 rounded-md"
                          />
                        </div>
                        <div className="flex flex-col justify-between w-full">
                          <div className="flex flex-col items-start">
                            <h1 className="font-semibold">{nanny.name}</h1>
                            <p className="text-muted-foreground text-sm line-clamp-1">
                              {nanny.experience_description}
                            </p>
                          </div>
                          <div className="flex items-end gap-6">
                            <div className="text-muted-foreground flex gap-1 items-center text-sm">
                              <Clock className="h-4 w-4" />
                              <p>Full-time</p>
                            </div>
                            <div className="text-muted-foreground flex gap-1 items-center text-sm">
                              <CircleDollarSign className="h-4 w-4" />
                              <p>Rp. {nanny.price_half}</p>
                            </div>
                          </div>
                        </div>
                        <div className="md:flex hidden items-end">
                          <Button className="font-normal" size={"sm"}>
                            Contact Now
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
          </div>
        </div>
      </div>
    </>
  );
}
