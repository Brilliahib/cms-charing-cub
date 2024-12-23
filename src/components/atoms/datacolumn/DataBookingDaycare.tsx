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
import Link from "next/link";
import { Eye, SquarePen } from "lucide-react";
import { BookingDaycare } from "@/types/booking/booking";
import { Badge } from "@/components/ui/badge";

export const bookingDaycareColumns: ColumnDef<BookingDaycare>[] = [
  {
    accessorKey: "index",
    header: "No",
    cell: ({ row }) => {
      return <p suppressHydrationWarning>{row.index + 1}</p>;
    },
  },
  {
    accessorKey: "name",
    header: "Nama",
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
    accessorKey: "name_babies",
    header: "Nama Bayi",
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
    accessorKey: "age_babies",
    header: "Age Babies",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <p suppressHydrationWarning className="md:line-clamp-2 line-clamp-1">
          {data.age_babies} Tahun
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
    accessorKey: "is_approved",
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
    header: "Status Approved",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <Badge variant={data.is_approved ? "success" : "destructive"}>
          {data.is_approved ? "Approved" : "Waiting"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "payment_proof",
    header: "Payment Proof",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <p suppressHydrationWarning className="md:line-clamp-2 line-clamp-1">
          {data.payment_proof ?? "Not yet paid"}
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
          <DropdownMenuLabel>Aksi</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link
              href={`/dashboard/admin/article/${data.id}/edit`}
              className="flex items-center text-gray-700"
            >
              <SquarePen className="h-4 w-4" />
              <span className="ml-2">Edit Artikel</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              href={`/dashboard/admin/article/${data.id}`}
              className="flex items-center text-gray-700"
            >
              <Eye className="h-4 w-4" />
              <span className="ml-2">Detail Artikel</span>
            </Link>
          </DropdownMenuItem>
        </ActionButton>
      );
    },
  },
];
