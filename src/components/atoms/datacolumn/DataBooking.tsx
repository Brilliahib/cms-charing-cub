"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { baseUrl } from "@/utils/app";
import ActionButton from "@/components/molecules/datatable/ActionButton";
import {
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Eye, SquarePen } from "lucide-react";
import { BookingNannies } from "@/types/booking/booking";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";

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
    header: "Nannies",
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
    accessorKey: "start_time",
    header: "Start Booking",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <p suppressHydrationWarning className="md:line-clamp-2 line-clamp-1">
          {format(data.start_time, "EEEE, d MMMM yyyy", {
            locale: id,
          })}
        </p>
      );
    },
  },
  {
    accessorKey: "end_time",
    header: "End Booking",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <p suppressHydrationWarning className="md:line-clamp-2 line-clamp-1">
          {format(data.end_time, "EEEE, d MMMM yyyy", {
            locale: id,
          })}
        </p>
      );
    },
  },
  {
    accessorKey: "time",
    header: "Overtime",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <p>
          {format(data.start_time, "HH:mm", {
            locale: id,
          })}{" "}
          -{" "}
          {format(data.end_time, "HH:mm", {
            locale: id,
          })}
        </p>
      );
    },
  },
  {
    accessorKey: "is_approved",
    header: "Status Approve",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <Badge variant={data.is_approved ? "success" : "destructive"}>
          {data.is_approved ? "Approved" : "Pending"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "is_paid",
    header: "Status Payment",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <Badge variant={data.is_paid ? "success" : "destructive"}>
          {data.is_paid ? "Paid" : "Pending"}
        </Badge>
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
    id: "actions",
    cell: ({ row }) => {
      const data = row.original;

      return (
        <ActionButton>
          <DropdownMenuLabel>Action</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link
              href={`/dashboard/bookings/${data.id}`}
              className="flex items-center text-gray-700"
            >
              <Eye className="h-4 w-4" />
              <span className="ml-2">Detail Booking</span>
            </Link>
          </DropdownMenuItem>
        </ActionButton>
      );
    },
  },
];
