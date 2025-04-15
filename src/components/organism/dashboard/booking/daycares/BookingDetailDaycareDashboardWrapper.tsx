"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useGetDetailBookingDaycare } from "@/http/daycares/bookings/get-detail-booking-daycare";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { id as idLocale } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { formatPaymentMethod } from "@/utils/format-payment-method";
import { formatPrice } from "@/utils/price";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { BookingLayoutDownloadDetailDaycare } from "./BookingLayoutDownloadDetail";

interface BookingDetailDaycareDashboardProps {
  id: string;
}

export default function BookingDetailDaycareDashboardContent({
  id,
}: BookingDetailDaycareDashboardProps) {
  const session = useSession();
  const { data, isPending } = useGetDetailBookingDaycare(
    {
      id,
    },
    { enabled: session.status === "authenticated" }
  );

  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  return (
    <>
      <div className="w-full space-y-8 py-4">
        <div>
          <Button variant={"outline"} onClick={() => reactToPrintFn()}>
            <Download /> Download PDF
          </Button>
        </div>
        <Card className="border">
          <CardContent className="p-4 md:p-6">
            <div className="grid md:grid-cols-3 grid-cols-1 md:gap-10 gap-6">
              <div className="space-y-2">
                <p className="font-semibold">ID Booking</p>
                <p className="uppercase text-muted-foreground">
                  #{data?.data.id}
                </p>
              </div>
              <div className="space-y-2">
                <p className="font-semibold">Nama Pengguna</p>
                <p className="text-muted-foreground">{data?.data.user.name}</p>
              </div>
              <div className="space-y-2">
                <p className="font-semibold">Email Pengguna</p>
                <p className="text-muted-foreground">{data?.data.user.email}</p>
              </div>
              <div className="space-y-2">
                <p className="font-semibold">Nama Anak</p>
                <p className="text-muted-foreground">
                  {data?.data.name_babies}
                </p>
              </div>
              <div className="space-y-2">
                <p className="font-semibold">Umur Anak</p>
                <p className="text-muted-foreground">
                  {data?.data.age_babies} Tahun
                </p>
              </div>
              <div className="space-y-2">
                <p className="font-semibold">Permintaan Khusus</p>
                <p className="text-muted-foreground">
                  {data?.data.special_request ?? "Tidak ada"}
                </p>
              </div>
              <div className="space-y-2">
                <p className="font-semibold">Daycare</p>
                <p className="text-muted-foreground">
                  {data?.data.daycares?.name}
                </p>
              </div>
              <div className="space-y-2">
                <p className="font-semibold">Lokasi Daycare</p>
                <p className="text-muted-foreground">
                  {data?.data.daycares?.location}
                </p>
              </div>
              <div className="space-y-2">
                <p className="font-semibold">Alamat Daycare</p>
                <p className="text-muted-foreground">
                  {data?.data.daycares?.address}
                </p>
              </div>
              <div className="space-y-2">
                <p className="font-semibold">Status Pembayaran</p>
                {(() => {
                  switch (data?.data.payment_status) {
                    case "paid":
                      return (
                        <div className="flex items-center gap-2">
                          <span className="text-green-500">Sudah Dibayar</span>
                        </div>
                      );
                    case "pending":
                      return (
                        <div className="flex items-center gap-2">
                          <span className="text-red-500">Belum Dibayar</span>
                        </div>
                      );
                    default:
                      return (
                        <div className="text-muted-foreground">
                          Status tidak dikenal
                        </div>
                      );
                  }
                })()}
              </div>
              <div className="space-y-2">
                <p className="font-semibold">Metode Pembayaran</p>
                <p className="text-muted-foreground">
                  {formatPaymentMethod(data?.data.payment_method!)}
                </p>
              </div>
              <div className="space-y-2">
                <p className="font-semibold">Mulai Booking</p>
                <p className="md:line-clamp-2 line-clamp-1 text-muted-foreground">
                  {data?.data.start_time
                    ? format(
                        new Date(data.data.start_time),
                        "EEEE, d MMMM yyyy, HH:mm",
                        {
                          locale: idLocale,
                        }
                      )
                    : "Loading"}
                </p>
              </div>
              <div className="space-y-2">
                <p className="font-semibold">Selesai Booking</p>
                <p className="md:line-clamp-2 line-clamp-1 text-muted-foreground">
                  {data?.data.end_time
                    ? format(
                        new Date(data.data.end_time),
                        "EEEE, d MMMM yyyy, HH:mm",
                        {
                          locale: idLocale,
                        }
                      )
                    : "Loading"}
                </p>
              </div>
              <div className="space-y-2">
                <p className="font-semibold">Harga Yang Dipilih</p>
                <p className="md:line-clamp-2 line-clamp-1 text-muted-foreground">
                  {formatPrice(data?.data.price_lists.price)}
                </p>
                <p className="md:line-clamp-2 line-clamp-1 text-muted-foreground">
                  {data?.data.price_lists.name} (
                  {data?.data.price_lists.age_start} -{" "}
                  {data?.data.price_lists.age_end} tahun)
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="hidden">
        {data?.data && (
          <BookingLayoutDownloadDetailDaycare
            ref={contentRef}
            data={data.data}
          />
        )}
      </div>
    </>
  );
}
