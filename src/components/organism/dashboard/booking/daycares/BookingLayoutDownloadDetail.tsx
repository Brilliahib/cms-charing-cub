"use client";

import { forwardRef } from "react";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";
import { BookingDaycare } from "@/types/booking/booking";
import Image from "next/image";
import { formatPrice } from "@/utils/price";
import { formatPaymentMethod } from "@/utils/format-payment-method";

interface Props {
  data: BookingDaycare;
}

export const BookingLayoutDownloadDetailDaycare = forwardRef<
  HTMLDivElement,
  Props
>(({ data }, ref) => {
  return (
    <div ref={ref} className="bg-white p-8 text-black w-full">
      {/* Kop Surat */}
      <div className="flex items-center gap-4 mb-6 border-b pb-4">
        <Image
          src="https://charingcub.com/images/logo.png"
          width={1000}
          height={1000}
          alt="Charingcub Logo"
          className="w-20 h-20 object-contain"
        />
        <div>
          <h1 className="text-xl font-bold">Charing Cub</h1>
          <p className="text-sm">
            Jl. Prof. Soedarto No.13, Tembalang, Kec. Tembalang, Kota Semarang,
            Jawa Tengah 50275
          </p>
          <p className="text-sm">charingcub@gmail.com</p>
        </div>
      </div>

      {/* Judul */}
      <div className="text-center mb-12">
        <h2 className="text-xl font-bold mb-1">Detail Booking Daycare</h2>
        <p className="text-sm text-muted-foreground">
          Dicetak pada{" "}
          {format(new Date(), "dd MMMM yyyy", { locale: idLocale })}
        </p>
      </div>

      {/* Konten Booking */}
      <div className="grid grid-cols-2 gap-6 text-sm">
        <div className="space-y-1">
          <p className="font-semibold">ID Booking</p>
          <p className="uppercase">#{data.id}</p>
        </div>
        <div className="space-y-1">
          <p className="font-semibold">Nama Pengguna</p>
          <p>{data.user.name}</p>
        </div>
        <div className="space-y-1">
          <p className="font-semibold">Email</p>
          <p>{data.user.email}</p>
        </div>
        <div className="space-y-1">
          <p className="font-semibold">Nama Anak</p>
          <p>{data.name_babies}</p>
        </div>
        <div className="space-y-1">
          <p className="font-semibold">Umur Anak</p>
          <p>{data.age_babies}</p>
        </div>
        <div className="space-y-1">
          <p className="font-semibold">Permintaan Khusus</p>
          <p>{data.special_request}</p>
        </div>
        <div className="space-y-1">
          <p className="font-semibold">Daycare</p>
          <p>{data.daycares?.name}</p>
        </div>
        <div className="space-y-1">
          <p className="font-semibold">Alamat Daycare</p>
          <p>{data.daycares?.address}</p>
        </div>
        <div className="space-y-1">
          <p className="font-semibold">Kota Daycare</p>
          <p>{data.daycares?.location}</p>
        </div>
        <div className="space-y-1">
          <p className="font-semibold">Mulai Booking</p>
          <p>
            {format(new Date(data.start_time), "EEEE, d MMMM yyyy, HH:mm", {
              locale: idLocale,
            })}
          </p>
        </div>
        <div className="space-y-1">
          <p className="font-semibold">Selesai Booking</p>
          <p>
            {format(new Date(data.end_time), "EEEE, d MMMM yyyy, HH:mm", {
              locale: idLocale,
            })}
          </p>
        </div>
        <div className="space-y-1">
          <p className="font-semibold">Harga</p>
          <p className="md:line-clamp-2 line-clamp-1">
            {formatPrice(data.price_lists.price)}
          </p>
          <p className="md:line-clamp-2 line-clamp-1">
            {data.price_lists.name} ({data.price_lists.age_start} -{" "}
            {data.price_lists.age_end} tahun)
          </p>
        </div>
        <div className="space-y-1">
          <p className="font-semibold">Status Pembayaran</p>
          <p
            className={
              data.payment_status === "paid" ? "text-green-500" : "text-red-500"
            }
          >
            {data.payment_status === "paid" ? "Sudah Dibayar" : "Belum Dibayar"}
          </p>
        </div>
        <div className="space-y-1">
          <p className="font-semibold">Metode Pembayaran</p>
          <p>{formatPaymentMethod(data.payment_method!)}</p>
        </div>
      </div>
      {/* Catatan */}
      <div className="mt-12 border-t pt-6 text-sm">
        <p className="font-semibold">Catatan:</p>
        <p>
          Harap membawa dokumen ini saat mengantarkan anak ke daycare sebagai
          bukti pemesanan yang sah.
        </p>
      </div>
    </div>
  );
});

BookingLayoutDownloadDetailDaycare.displayName = "BookingPDFDaycareLayout";
