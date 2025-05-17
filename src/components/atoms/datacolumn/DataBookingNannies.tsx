"use client";

import { ColumnDef } from "@tanstack/react-table";
import ActionButton from "@/components/molecules/datatable/ActionButton";
import { ArrowUpDown, Check, Trash2 } from "lucide-react";
import { BookingNannies } from "@/types/booking/booking";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BookingNanniesProps extends BookingNannies {
  approveBookingNanniesHandler: (data: BookingNanniesProps) => void;
}

const ActionsCell = ({ data }: { data: BookingNanniesProps }) => {
  return (
    <>
      <ActionButton>
        <div
          className="text-green-500 cursor-pointer focus:text-green-700"
          onClick={() => data.approveBookingNanniesHandler(data)}
        >
          <Check className="h-4 w-4 " />
          <span className="ml-2 ">Setujui Booking</span>
        </div>
        <div className="flex cursor-pointer items-center text-red-600 hover:text-red-800 hover:underline">
          <Trash2 className="h-4 w-4" />
          <span className="ml-2">Hapus</span>
        </div>
      </ActionButton>
    </>
  );
};

export const bookingNanniesColumns: ColumnDef<BookingNanniesProps>[] = [
  {
    accessorKey: "name",
    header: "Nama Pengguna",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <p suppressHydrationWarning className="md:line-clamp-2 line-clamp-1">
          {data.user.name}
        </p>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Nama Anak",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <p suppressHydrationWarning className="md:line-clamp-2 line-clamp-1">
          {data.name_babies}
        </p>
      );
    },
  },
  {
    accessorKey: "is_approved",
    header: "Status Diterima",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <span className={data.is_approved ? "text-green-500" : "text-red-500"}>
          {data.is_approved ? "Diterima" : "Menunggu Konfirmasi"}
        </span>
      );
    },
  },
  {
    accessorKey: "payment_proof",
    header: "Bukti Pembayaran",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <p
          suppressHydrationWarning
          className={cn(
            "md:line-clamp-2 line-clamp-1",
            data.payment_proof ? "text-green-500" : "text-red-500"
          )}
        >
          {data.payment_proof ?? "Belum Dibayar"}
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
    cell: ({ row }) => <ActionsCell data={row.original} />,
  },
];
