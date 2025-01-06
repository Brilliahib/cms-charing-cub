"use client";

import RatingStars from "@/components/atoms/rating/RatingStar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useAddBookingDaycare } from "@/http/daycares/bookings/add-booking-daycare";
import { useGetDetailDaycare } from "@/http/daycares/get-detail-daycare";
import { baseUrl } from "@/utils/app";
import {
  bookingDaycareSchema,
  BookingDaycareType,
} from "@/validators/daycares/booking-daycare-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MapPin } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface CardBookingDaycareParams {
  id: string;
}

export default function CardBookingDaycare({ id }: CardBookingDaycareParams) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data } = useGetDetailDaycare({ id });

  const form = useForm<BookingDaycareType>({
    resolver: zodResolver(bookingDaycareSchema),
    defaultValues: {
      daycare_id: Number(id),
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
    onSuccess: () => {
      toast.success("Successfully to booking daycare");
      queryClient.invalidateQueries({
        queryKey: ["booking-daycare-list"],
      });
      router.push("/dashboard/bookings/daycares");
    },
  });

  const onSubmit = (body: BookingDaycareType) => {
    addBookingDaycareHandler({ ...body, daycare_id: Number(id) });
  };
  return (
    <>
      <Card className="shadow border w-full">
        <CardContent className="md:p-8 p-6">
          <div className="space-y-4 md:space-y-6 w-full">
            <div className="flex md:flex-row flex-col gap-4 p-4 border rounded-xl">
              <Image
                src={`${baseUrl}/${data?.data.facility_images[0].image_url}`}
                alt={data?.data.name ?? "Daycare"}
                width={1000}
                height={1000}
                className="md:max-w-[250px] w-full object-cover h-[150px] rounded-lg"
              />
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
            <Form {...form}>
              <form
                className="space-y-6"
                onSubmit={form.handleSubmit(onSubmit)}
              >
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
                          <Input
                            type="datetime-local"
                            {...field}
                            onChange={(e) => {
                              const dateTime = e.target.value;
                              const formattedDateTime = `${dateTime}:00`;
                              field.onChange(formattedDateTime);
                            }}
                            className="text-muted-foreground"
                          />
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
                          <Input
                            type="datetime-local"
                            {...field}
                            onChange={(e) => {
                              const dateTime = e.target.value;
                              const formattedDateTime = `${dateTime}:00`;
                              field.onChange(formattedDateTime);
                            }}
                            className="text-muted-foreground"
                          />
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
                        Special Request <span className="text-red-500">*</span>
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

                <div className="flex justify-end">
                  <Button type="submit" disabled={isPending}>
                    {isPending ? "Loading..." : "Request to Book"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
