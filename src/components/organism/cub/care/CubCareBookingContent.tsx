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

interface CubCareBookingParams {
  id: number;
}

export default function CubCareBookingContent() {
  const { id } = useParams();

  const { data } = useGetDetailNannies({ id: Number(id) });

  const queryClient = useQueryClient();
  const { toast } = useToast();
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
      toast({
        title: "Gagal melakukan booking nannies!",
        description: error.response?.data.message,
        variant: "destructive",
      });
    },
    onSuccess: () => {
      toast({
        title: "Berhasil melakukan booking nannies!",
        variant: "success",
      });
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
      <div className="mx-auto px-4 max-w-[1400px]">
        <div className="grid md:grid-cols-2 grid-cols-1 md:gap-8 gap-6">
          <div>
            <Card className="sticky top-20">
              <CardContent className="p-6 md:p-8">
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <Image
                      src={`${baseUrl}/${data?.data.images}`}
                      alt={data?.data.name ?? "Nannies"}
                      width={1000}
                      height={1000}
                      className="w-[400px] object-cover md:h-[400px] rounded-xl"
                    />
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h1 className="md:text-3xl text-xl font-paytone">
                        {data?.data.name}
                      </h1>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RatingStars rating={data?.data.rating || 0} />{" "}
                      <span className="text-sm text-muted-foreground">
                        ({data?.data.rating_count})
                      </span>
                    </div>
                    <div className="space-y-4 text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5" />
                        <p>Joined since {createdYear}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-5 w-5" />
                        <p>{data?.data.contact}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="space-y-4 md:space-y-6">
            <div className="space-y-4">
              <Card>
                <CardContent className="md:p-6 p-4">
                  <div className="md:space-y-6 space-y-4">
                    <div>
                      <h1 className="text-xl font-paytone">Payment</h1>
                    </div>
                    <div className="flex items-center justify-between">
                      <h1 className="text-muted-foreground font-semibold text-sm">
                        Bank Name
                      </h1>
                      <h1 className="font-bold">BRI</h1>
                    </div>
                    <div className="flex items-center justify-between">
                      <h1 className="text-muted-foreground font-semibold text-sm">
                        Bank Account
                      </h1>
                      <h1 className="font-bold">{data?.data.name}</h1>
                    </div>
                    <div className="flex items-center justify-between">
                      <h1 className="text-muted-foreground font-semibold text-sm">
                        Bank Number
                      </h1>
                      <h1 className="font-bold">34048374530</h1>
                    </div>
                    <div className="bg-secondary rounded-xl p-4 space-y-4">
                      <h1 className="font-bold">The benefit you get</h1>
                      <ul className="space-y-4 text-sm">
                        <li>
                          <div className="flex gap-4 items-center">
                            <BadgeCheck className="text-green-500" />
                            <p>Safe and Comfortable Environment</p>
                          </div>
                        </li>
                        <li>
                          <div className="flex gap-4 items-center">
                            <BadgeCheck className="text-green-500" />
                            <p>Early Learning and Development Programs</p>
                          </div>
                        </li>
                        <li>
                          <div className="flex gap-4 items-center">
                            <BadgeCheck className="text-green-500" />
                            <p>Socialization and Interaction</p>
                          </div>
                        </li>
                        <li>
                          <div className="flex gap-4 items-center">
                            <BadgeCheck className="text-green-500" />
                            <p>Clean and Hygienic Environment</p>
                          </div>
                        </li>
                        <li>
                          <div className="flex gap-4 items-center">
                            <BadgeCheck className="text-green-500" />
                            <p>Trained and Experienced Staff</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="space-y-4">
              <Card>
                <CardContent className="md:p-6 p-4">
                  <div className="mb-4">
                    <h1 className="font-paytone text-xl">
                      Booking Information
                    </h1>
                  </div>
                  <div>
                    <Form {...form}>
                      <form
                        className="space-y-5 pt-4"
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
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
