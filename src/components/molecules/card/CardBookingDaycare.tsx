"use client";

import AlertInformationBookingDaycare from "@/components/atoms/alert/AlertInformationBookingDaycare";
import RatingStars from "@/components/atoms/rating/RatingStar";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useAddBookingDaycare } from "@/http/daycares/bookings/add-booking-daycare";
import { useGetDetailDaycare } from "@/http/daycares/get-detail-daycare";
import { cn } from "@/lib/utils";
import { PriceListDaycare } from "@/types/daycares/daycare";
import { baseUrl } from "@/utils/app";
import { formatPrice } from "@/utils/price";
import {
  bookingDaycareSchema,
  BookingDaycareType,
} from "@/validators/daycares/booking-daycare-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { format } from "date-fns";
import { CalendarIcon, CircleHelp, Clock, MapPin } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface CardBookingDaycareParams {
  id: string;
}

export default function CardBookingDaycare({ id }: CardBookingDaycareParams) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data } = useGetDetailDaycare({ id });
  const [selectedPrice, setSelectedPrice] = useState<PriceListDaycare | null>(
    null
  );

  const form = useForm<BookingDaycareType>({
    resolver: zodResolver(bookingDaycareSchema),
    defaultValues: {
      daycare_id: String(id),
      price_id: "",
      name_babies: "",
      age_babies: 0,
      special_request: "",
      start_time: "",
      end_time: "",
    },
    mode: "onChange",
  });

  const { mutate: addBookingDaycareHandler, isPending } = useAddBookingDaycare({
    onError: (error: AxiosError<any>) => {
      toast.error("Failed to booking daycare", {
        description: error.response?.data.message,
      });
    },
    onSuccess: (response) => {
      toast.success("Successfully booked daycare. Redirecting to payment...");
      router.push(response.data.payment_url);

      queryClient.invalidateQueries({
        queryKey: ["booking-daycare-list"],
      });
    },
  });

  const onSubmit = (body: BookingDaycareType) => {
    addBookingDaycareHandler({ ...body, daycare_id: String(id) });
  };
  return (
    <>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4 md:gap-6">
        <Card className="shadow border w-full h-fit rounded-xl md:sticky md:top-20">
          <CardHeader>
            <CardTitle>
              <Image
                src={`${baseUrl}/${data?.data.facility_images[0].image_url}`}
                alt={data?.data.name ?? "Daycare"}
                width={1000}
                height={1000}
                className="w-full object-cover h-[250px] rounded-xl"
                priority={true}
              />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="space-y-3">
                <div>
                  <h1 className="md:text-xl text-base font-bold">
                    {data?.data.name}
                  </h1>
                </div>
                <div className="flex items-center space-x-2">
                  <RatingStars rating={data?.data.rating || 0} />{" "}
                  <span className="text-sm text-muted-foreground">
                    {data?.data.reviewers_count} Reviews
                  </span>
                </div>
                <div className="flex gap-2 text-sm">
                  <MapPin className="h-5 w-5 flex-shrink-0" />
                  <p>{data?.data.address}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <Card className="shadow border w-full">
              <CardContent className="md:p-8 p-6">
                <div className="space-y-6 md:space-y-8 w-full">
                  <h1 className="text-lg font-bold">Enter Your Details</h1>
                  <div className="flex flex-col space-y-4 md:space-y-6">
                    <FormField
                      control={form.control}
                      name="name_babies"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Babies Name <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Masukkan nama bayi"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="age_babies"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Age <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Masukkan umur bayi"
                              {...field}
                              className="text-muted-foreground"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="start_time"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Start Time <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    className={cn(
                                      "w-full pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? (
                                      format(new Date(field.value), "PPP p")
                                    ) : (
                                      <span>Pick start time</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-full p-2"
                                align="start"
                              >
                                <div className="flex flex-col space-y-4 p-4">
                                  {/* Date Picker */}
                                  <Calendar
                                    mode="single"
                                    selected={
                                      field.value
                                        ? new Date(field.value)
                                        : undefined
                                    }
                                    onSelect={(date) => {
                                      const current = field.value
                                        ? new Date(field.value)
                                        : new Date();
                                      const updated = new Date(date || current);
                                      updated.setHours(
                                        current.getHours(),
                                        current.getMinutes()
                                      );

                                      const formattedDate = format(
                                        updated,
                                        "yyyy-MM-dd HH:mm:ss"
                                      );
                                      field.onChange(formattedDate);
                                    }}
                                    disabled={(date) => {
                                      const today = new Date();
                                      today.setHours(0, 0, 0, 0);
                                      return date < today;
                                    }}
                                    initialFocus
                                    className="p-0"
                                  />
                                  <hr />
                                  {/* Time Picker */}
                                  <div>
                                    <div className="flex gap-2 items-center justify-between">
                                      <div className="flex gap-2 items-center text-muted-foreground text-sm">
                                        <Clock className="h-5 w-5" />
                                        <p>Time</p>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <div className="flex items-center space-x-2">
                                          <Input
                                            type="number"
                                            min="0"
                                            max="23"
                                            value={
                                              field.value
                                                ? new Date(
                                                    field.value
                                                  ).getHours()
                                                : ""
                                            }
                                            onChange={(e) => {
                                              const current = field.value
                                                ? new Date(field.value)
                                                : new Date();
                                              const updated = new Date(current);
                                              updated.setHours(
                                                Number(e.target.value) || 0,
                                                current.getMinutes()
                                              );

                                              const formattedDate = format(
                                                updated,
                                                "yyyy-MM-dd HH:mm:ss"
                                              );
                                              field.onChange(formattedDate);
                                            }}
                                            className="w-12 text-center"
                                          />
                                        </div>
                                        <div>:</div>
                                        <div className="flex items-center space-x-2">
                                          <Input
                                            type="number"
                                            min="0"
                                            max="59"
                                            value={
                                              field.value
                                                ? new Date(
                                                    field.value
                                                  ).getMinutes()
                                                : ""
                                            }
                                            onChange={(e) => {
                                              const current = field.value
                                                ? new Date(field.value)
                                                : new Date();
                                              const updated = new Date(current);
                                              updated.setHours(
                                                Number(e.target.value) || 0,
                                                current.getMinutes()
                                              );

                                              const formattedDate = format(
                                                updated,
                                                "yyyy-MM-dd HH:mm:ss"
                                              );
                                              field.onChange(formattedDate);
                                            }}
                                            className="w-12 text-center"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </PopoverContent>
                            </Popover>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="end_time"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            End Time <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    className={cn(
                                      "w-full pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? (
                                      format(new Date(field.value), "PPP p")
                                    ) : (
                                      <span>Pick end time</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-full p-2"
                                align="start"
                              >
                                <div className="flex flex-col space-y-4 p-4">
                                  {/* Date Picker */}
                                  <Calendar
                                    mode="single"
                                    selected={
                                      field.value
                                        ? new Date(field.value)
                                        : undefined
                                    }
                                    onSelect={(date) => {
                                      const current = field.value
                                        ? new Date(field.value)
                                        : new Date();
                                      const updated = new Date(date || current);
                                      updated.setHours(
                                        current.getHours(),
                                        current.getMinutes()
                                      );

                                      const formattedDate = format(
                                        updated,
                                        "yyyy-MM-dd HH:mm:ss"
                                      );
                                      field.onChange(formattedDate);
                                    }}
                                    disabled={(date) => {
                                      const today = new Date();
                                      today.setHours(0, 0, 0, 0);
                                      return date < today;
                                    }}
                                    initialFocus
                                    className="p-0"
                                  />
                                  <hr />
                                  {/* Time Picker */}
                                  <div>
                                    <div className="flex gap-2 items-center justify-between">
                                      <div className="flex gap-2 items-center text-muted-foreground text-sm">
                                        <Clock className="h-5 w-5" />
                                        <p>Time</p>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <div className="flex items-center space-x-2">
                                          <Input
                                            type="number"
                                            min="0"
                                            max="23"
                                            value={
                                              field.value
                                                ? new Date(
                                                    field.value
                                                  ).getHours()
                                                : ""
                                            }
                                            onChange={(e) => {
                                              const current = field.value
                                                ? new Date(field.value)
                                                : new Date();
                                              const updated = new Date(current);
                                              updated.setHours(
                                                Number(e.target.value) || 0,
                                                current.getMinutes()
                                              );

                                              const formattedDate = format(
                                                updated,
                                                "yyyy-MM-dd HH:mm:ss"
                                              );
                                              field.onChange(formattedDate);
                                            }}
                                            className="w-12 text-center"
                                          />
                                        </div>
                                        <div>:</div>
                                        <div className="flex items-center space-x-2">
                                          <Input
                                            type="number"
                                            min="0"
                                            max="59"
                                            value={
                                              field.value
                                                ? new Date(
                                                    field.value
                                                  ).getMinutes()
                                                : ""
                                            }
                                            onChange={(e) => {
                                              const current = field.value
                                                ? new Date(field.value)
                                                : new Date();
                                              const updated = new Date(current);
                                              updated.setHours(
                                                Number(e.target.value) || 0,
                                                current.getMinutes()
                                              );

                                              const formattedDate = format(
                                                updated,
                                                "yyyy-MM-dd HH:mm:ss"
                                              );
                                              field.onChange(formattedDate);
                                            }}
                                            className="w-12 text-center"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </PopoverContent>
                            </Popover>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="special_request"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Special Request{" "}
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Masukkan special request"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="price_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Price <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Select
                            value={String(field.value) || ""}
                            onValueChange={(value) => {
                              const selected = data?.data.price_lists.find(
                                (priceList) => String(priceList.id) === value
                              );
                              setSelectedPrice(selected || null);
                              field.onChange(String(value));
                            }}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Pilih harga" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Pilihan Harga</SelectLabel>
                                {data?.data.price_lists.map((priceList) => (
                                  <SelectItem
                                    key={priceList.id}
                                    value={String(priceList.id)}
                                  >
                                    Umur {priceList.age_start} bulan sampai{" "}
                                    {priceList.age_end} bulan —{" "}
                                    <b>{formatPrice(priceList.price)}</b> (
                                    {priceList.name})
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
            <Card className="shadow border w-full">
              <CardContent className="md:p-8 p-6">
                <div className="space-y-8">
                  <div className="space-y-6">
                    <h1 className="font-bold text-lg">Payment Details</h1>
                    <AlertInformationBookingDaycare />
                    <div className="flex justify-between">
                      <p>Harga Normal</p>
                      <p>
                        {selectedPrice ? formatPrice(selectedPrice.price) : "-"}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p className="flex gap-2 items-center">
                        Service fee{" "}
                        <CircleHelp className="h-4 w-4 text-green-600" />{" "}
                      </p>
                      <p className="text-green-600">+ {formatPrice(10000)}</p>
                    </div>
                    <div className="flex justify-between">
                      <p>Harga Total</p>
                      <p>
                        {selectedPrice
                          ? formatPrice(selectedPrice.price + 10000)
                          : "-"}
                      </p>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    disabled={isPending}
                    className="w-full rounded-full"
                  >
                    {isPending ? "Loading..." : "Request to Book"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </form>
        </Form>
      </div>
    </>
  );
}
