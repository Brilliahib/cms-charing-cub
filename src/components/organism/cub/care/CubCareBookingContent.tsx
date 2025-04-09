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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import { Textarea } from "@/components/ui/textarea";
import { useAddBookingNannies } from "@/http/nannies/add-booking-nannies";
import { useGetDetailNannies } from "@/http/nannies/get-detail-nannies";
import { NanniesPriceList } from "@/types/cub/cub";
import { baseUrl } from "@/utils/app";
import { formatPrice } from "@/utils/price";
import {
  bookingNanniesSchema,
  BookingNanniesType,
} from "@/validators/nannies/booking-nannies-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function CubCareBookingContent() {
  const { id } = useParams();
  const [selectedPrice, setSelectedPrice] = useState<NanniesPriceList | null>(
    null
  );

  const { data } = useGetDetailNannies({ id: String(id) });

  const queryClient = useQueryClient();
  const router = useRouter();

  const form = useForm<BookingNanniesType>({
    resolver: zodResolver(bookingNanniesSchema),
    defaultValues: {
      nanny_id: String(id),
      price_id: "",
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
      toast.error("Gagal melakukan booking nannies", {
        description: error.response?.data.message,
      });
    },
    onSuccess: () => {
      toast.success("Berhasil melakukan booking nannies");
      queryClient.invalidateQueries({
        queryKey: ["nannies-list"],
      });
      router.push("/dashboard/bookings/nannies");
    },
  });

  const onSubmit = (body: BookingNanniesType) => {
    addBookingNanniesHandler({ ...body, nanny_id: String(id) });
    console.log(body);
  };

  return (
    <>
      <div className="pad-x py-8">
        <div className="grid md:grid-cols-2 grid-cols-1 md:gap-8 gap-6">
          <div className="space-y-4 md:space-y-6">
            <Card className="border shadow-sm md:sticky md:top-20">
              <CardHeader>
                <CardTitle>Detail Nannies</CardTitle>
                <CardDescription>
                  Menampilkan detail informasi nannies
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
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
                        {data?.data.user.name}
                      </h1>
                      <div className="flex items-center space-x-2">
                        <RatingStars rating={data?.data.daycare?.rating || 0} />{" "}
                        <span className="text-sm text-muted-foreground">
                          ({data?.data.daycare?.rating})
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="space-y-4">
                      <div className="flex md:flex-row flex-col">
                        <div className="md:w-4/12 text-muted-foreground">
                          Daycare
                        </div>
                        <div className="md:w-8/12">
                          {data?.data.daycare?.name ?? "Tidak Memiliki Daycare"}
                        </div>
                      </div>
                      <div className="flex md:flex-row flex-col">
                        <div className="md:w-4/12 text-muted-foreground">
                          Nomor Telepon
                        </div>
                        <div className="md:w-8/12">{data?.data.contact}</div>
                      </div>
                      <div className="flex md:flex-row flex-col">
                        <div className="md:w-4/12 text-muted-foreground">
                          Lokasi
                        </div>
                        <div className="md:w-8/12">
                          {data?.data.daycare?.address ?? "Lokasi Tidak Ada"}
                        </div>
                      </div>
                      <div className="flex md:flex-row flex-col">
                        <div className="md:w-4/12 text-muted-foreground">
                          Jenis Kelamin
                        </div>
                        <div className="md:w-8/12">
                          {data?.data.gender === "male"
                            ? "Laki-laki"
                            : data?.data.gender === "female"
                            ? "Perempuan"
                            : data?.data.gender}
                        </div>
                      </div>
                      <div className="flex md:flex-row flex-col">
                        <div className="md:w-4/12 text-muted-foreground">
                          Pilihan Harga
                        </div>
                        <div className="md:w-8/12">
                          <div className="space-y-2">
                            {data?.data.price_lists.map((price) => (
                              <div key={price.id}>
                                <h1>
                                  {formatPrice(price.price)} ({price.name})
                                </h1>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card className="border shadow-sm">
              <CardHeader>
                <CardTitle>Form Booking</CardTitle>
                <CardDescription>
                  Lengkapi form berikut untuk melakukan booking nannies
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
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
                              <FormLabel>Nama Anak</FormLabel>
                              <FormControl>
                                <Input
                                  type="text"
                                  placeholder="Masukkan nama anak Anda"
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
                              <FormLabel>Umur Anak</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="Masukkan umur bayi"
                                  {...field}
                                  className="text-muted-foreground"
                                />
                              </FormControl>
                              <FormDescription>
                                * Umur dalam tahun
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="start_time"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Mulai Booking</FormLabel>
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
                              <FormLabel>Selesai Booking</FormLabel>
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
                              <FormLabel>Permintaan Tambahan</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Masukkan permintaan tambahan"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>
                                * Contoh: Anak saya alergi udang, hindari
                                makanan seafood
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="price_id"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Pilih Paket Harga</FormLabel>
                              <Select
                                onValueChange={(value) => {
                                  field.onChange(value);
                                  const selected = data?.data.price_lists.find(
                                    (price) => price.id === value
                                  );
                                  setSelectedPrice(selected ?? null);
                                }}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Pilih harga yang diinginkan" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectLabel>Daftar Harga</SelectLabel>
                                    {data?.data.price_lists.map((price) => (
                                      <SelectItem
                                        key={price.id}
                                        value={price.id}
                                      >
                                        {price.name} -{" "}
                                        {formatPrice(price.price)}
                                      </SelectItem>
                                    ))}
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="flex justify-end">
                          <Button
                            type="submit"
                            disabled={isPending}
                            className="font-medium"
                          >
                            {isPending ? "Loading..." : "Booking Sekarang"}
                          </Button>
                        </div>
                      </form>
                    </Form>
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
