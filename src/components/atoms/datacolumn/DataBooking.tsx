"use client";

import { ColumnDef } from "@tanstack/react-table";
import ActionButton from "@/components/molecules/datatable/ActionButton";
import { ArrowUpDown, CircleCheck, Eye, Loader, Trash2 } from "lucide-react";
import { BookingNannies } from "@/types/booking/booking";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const bookingUserNanniesColumns: ColumnDef<BookingNannies>[] = [
  {
    accessorKey: "index",
    header: "No",
    cell: ({ row }) => {
      return <p suppressHydrationWarning>{row.index + 1}</p>;
    },
  },
  {
    accessorKey: "name",
    header: "Nama Nannies",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <p suppressHydrationWarning className="md:line-clamp-2 line-clamp-1">
          {data.nannies?.user.name}
        </p>
      );
    },
  },
  {
    accessorKey: "is_approved",
    header: "Status Booking",
    cell: ({ row }) => {
      const data = row.original;

      if (data.is_approved) {
        return (
          <div className="flex items-center gap-2 text-sm">
            <CircleCheck className="text-green-500 h-4 w-4" />
            <span className="text-green-500">Diterima</span>
          </div>
        );
      }

      return (
        <div className="flex items-center gap-2 text-sm">
          <Loader className="text-yellow-500 h-4 w-4" />
          <span className="text-yellow-500">Menunggu Konfirmasi</span>
        </div>
      );
    },
  },
  {
    accessorKey: "is_paid",
    header: "Status Pembayaran",
    cell: ({ row }) => {
      const data = row.original;

      if (data.is_paid) {
        return (
          <div className="flex items-center gap-2 text-sm">
            <CircleCheck className="text-green-500 h-4 w-4" />
            <span className="text-green-500">Dibayar</span>
          </div>
        );
      }

      return (
        <div className="flex items-center gap-2 text-sm">
          <Loader className="text-yellow-500 h-4 w-4" />
          <span className="text-yellow-500">Belum Dibayar</span>
        </div>
      );
    },
  },
  {
    accessorKey: "price_full",
    header: "Bukti Pembayaran",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <p suppressHydrationWarning className="md:line-clamp-2 line-clamp-1">
          {data.payment_proof ?? "Belum dibayar"}
        </p>
      );
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
          {format(data.start_time, "EEEE, d MMMM yyyy, HH:mm", {
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
            href={`/dashboard/bookings/${data.id}`}
            className="flex cursor-pointer items-center text-gray-700 hover:underline"
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
