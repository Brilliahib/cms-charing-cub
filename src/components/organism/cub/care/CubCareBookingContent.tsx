"use client";

import RatingStars from "@/components/atoms/rating/RatingStar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { useAddBookingNannies } from "@/http/nannies/add-booking-nannies";
import { useGetDetailNannies } from "@/http/nannies/get-detail-nannies";
import { baseUrl } from "@/utils/app";
import {
  bookingNanniesSchema,
  BookingNanniesType,
} from "@/validators/nannies/booking-nannies-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { format } from "date-fns";
import { BadgeCheck, Clock, Phone } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface CubCareBookingParams {
  id: number;
}

export default function CubCareBookingContent() {
  const { id } = useParams();

  const { data } = useGetDetailNannies({ id: String(id) });

  const queryClient = useQueryClient();
  const router = useRouter();

  const form = useForm<BookingNanniesType>({
    resolver: zodResolver(bookingNanniesSchema),
    defaultValues: {
      nanny_id: Number(id),
      name_babies: "",
      age_babies: 0,
      special_request: "",
      start_time: "",
      end_time: "",
    },
    mode: "onChange",
  });

  const { mutate: addBookingNanniesHandler, isPending } = useAddBookingNannies({
    onError: (error: AxiosError<any>) => {
      toast.error("Failed to booking nannies", {
        description: error.response?.data.message,
      });
    },
    onSuccess: () => {
      toast.success("Successfully to booking nannies");
      queryClient.invalidateQueries({
        queryKey: ["nannies-list"],
      });
      router.push("/dashboard/booking");
    },
  });

  const onSubmit = (body: BookingNanniesType) => {
    addBookingNanniesHandler({ ...body, nanny_id: Number(id) });
  };

  const createdYear = data?.data.created_at
    ? format(new Date(data.data.created_at), "MMMM yyyy")
    : "";
  return (
    <>
      <div className="pad-x-xl py-8">
        <div className="grid md:grid-cols-2 grid-cols-1 md:gap-8 gap-6">
          <div>
            <Card className="border shadow-sm">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex gap-4 items-center">
                    <Image
                      src={`${baseUrl}/${data?.data.images}`}
                      alt={data?.data.name ?? "Nannies"}
                      width={100}
                      height={100}
                      className="rounded-full bg-primary/50"
                    />
                    <div className="space-y-2">
                      <h1 className="text-lg font-semibold">
                        {data?.data.name}
                      </h1>
                      <div className="flex items-center space-x-2">
                        <RatingStars rating={data?.data.rating || 0} />{" "}
                        <span className="text-sm text-muted-foreground">
                          ({data?.data.rating_count})
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <Form {...form}>
                      <form
                        className="space-y-8 pt-4"
                        onSubmit={form.handleSubmit(onSubmit)}
                      >
                        <FormField
                          control={form.control}
                          name="name_babies"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Babies Name</FormLabel>
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
                              <FormLabel>Age</FormLabel>
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
                              <FormLabel>Start Time</FormLabel>
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
                              <FormLabel>End Time</FormLabel>
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
                          name="special_request"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Special Request</FormLabel>
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
                            {isPending ? "Loading..." : "Booking Now"}
                          </Button>
                        </div>
                      </form>
                    </Form>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="space-y-4 md:space-y-6">
            <Card className="border shadow-sm">
              <CardHeader>
                <CardTitle>Payment</CardTitle>
                <CardDescription>
                  Make payment to the following bank account.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 p-3 border rounded-md">
                  <div className="flex items-center justify-between text-sm">
                    <h1 className="text-muted-foreground text-sm">Bank Name</h1>
                    <h1 className="font-semibold">{data?.data.daycare_bank}</h1>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <h1 className="text-muted-foreground text-sm">Name</h1>
                    <h1 className="font-semibold">
                      {data?.data.daycare_bank_name}
                    </h1>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <h1 className="text-muted-foreground">Bank Number</h1>
                    <h1 className="font-semibold">
                      {data?.data.daycare_bank_number}
                    </h1>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
