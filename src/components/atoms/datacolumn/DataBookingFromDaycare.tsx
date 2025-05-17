"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import ActionButton from "@/components/molecules/datatable/ActionButton";
import Link from "next/link";
import { ArrowUpDown, Eye, Trash2 } from "lucide-react";
import { BookingDaycare } from "@/types/booking/booking";
import { Button } from "@/components/ui/button";

const paymentMethodLabel: Record<string, string> = {
  credit_card: "Kartu Kredit",
  gopay: "GoPay",
  bank_transfer: "Transfer Bank",
  qris: "QRIS",
  shopeepay: "ShopeePay",
  ovo: "OVO",
};

export const bookingDaycareFromDaycareColumns =
  (): ColumnDef<BookingDaycare>[] => [
    {
      accessorKey: "name",
      header: "Nama Pengguna",
      cell: ({ row }) => {
        const data = row.original;
        return (
          <>
            <p suppressHydrationWarning className="line-clamp-2">
              {data.user.name}
            </p>
          </>
        );
      },
    },
    {
      accessorKey: "name_babies",
      header: "Nama Anak",
      cell: ({ row }) => {
        const data = row.original;
        return (
          <p suppressHydrationWarning className="line-clamp-2">
            {data.name_babies}
          </p>
        );
      },
    },
    {
      accessorKey: "special_request",
      header: "Permintaan Khusus",
      cell: ({ row }) => {
        const data = row.original;
        return (
          <p suppressHydrationWarning className="line-clamp-2">
            {data.special_request ?? "Tidak ada"}
          </p>
        );
      },
    },
    {
      accessorKey: "payment_status",
      header: "Status Pembayaran",
      cell: ({ row }) => {
        const data = row.original;
        switch (data.payment_status) {
          case "paid":
            return (
              <div className="flex items-center gap-2 text-sm">
                <span className="text-green-500">Sudah Dibayar</span>
              </div>
            );
          case "pending":
            return (
              <div className="flex items-center gap-2 text-sm">
                <span className="text-red-500">Belum Dibayar</span>
              </div>
            );
          default:
            return (
              <div className="text-muted-foreground text-sm">
                Status tidak dikenal
              </div>
            );
        }
      },
    },
    {
      accessorKey: "payment_method",
      header: "Metode Pembayaran",
      cell: ({ row }) => {
        const data = row.original;
        const method = data.payment_method;

        if (!method) {
          return <span className="text-red-500">Belum Dibayar</span>;
        }

        const label = paymentMethodLabel[method] ?? "Metode Tidak Dikenal";

        return <span>{label}</span>;
      },
    },
    {
      accessorKey: "start_time",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Tanggal Booking
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => {
        const data = row.original;
        return (
          <p suppressHydrationWarning className="md:line-clamp-2 line-clamp-1">
            {format(data.start_time, "EEEE, d MMMM yyyy HH:mm:ss", {
              locale: id,
            })}
          </p>
        );
      },
      enableSorting: true,
      sortingFn: (rowA, rowB) => {
        const timeA = new Date(rowA.original.start_time).getTime();
        const timeB = new Date(rowB.original.start_time).getTime();
        return timeA - timeB;
      },
    },

    {
      id: "actions",
      cell: ({ row }) => {
        const data = row.original;

        return (
          <ActionButton>
            <Link
              href={`/dashboard/daycares/bookings/${data.id}`}
              className="flex items-center text-gray-700"
            >
              <Eye className="h-4 w-4" />
              <span className="ml-2">Detail</span>
            </Link>
            <div className="flex cursor-pointer items-center text-red-600 hover:text-red-800 hover:underline">
              <Trash2 className="h-4 w-4" />
              <span className="ml-2">Hapus</span>
            </div>
          </ActionButton>
        );
      },
    },
  ];
