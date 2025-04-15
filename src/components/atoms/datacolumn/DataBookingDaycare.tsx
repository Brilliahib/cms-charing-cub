"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import ActionButton from "@/components/molecules/datatable/ActionButton";
import {
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown, Eye } from "lucide-react";
import { BookingDaycare } from "@/types/booking/booking";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const bookingDaycareColumns: ColumnDef<BookingDaycare>[] = [
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
    accessorKey: "daycare_name",
    header: "Daycare",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <p suppressHydrationWarning className="line-clamp-2">
          {data.daycares?.name}
        </p>
      );
    },
  },
  {
    accessorKey: "daycare_location",
    header: "Lokasi Daycare",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <p suppressHydrationWarning className="line-clamp-2">
          {data.daycares?.address}
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
          <DropdownMenuLabel>Aksi</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link
              href={`/dashboard/bookings/daycares/${data.id}`}
              className="flex items-center text-gray-700 hover:underline"
            >
              <Eye className="h-4 w-4" />
              <span className="ml-2">Detail</span>
            </Link>
          </DropdownMenuItem>
        </ActionButton>
      );
    },
  },
];
