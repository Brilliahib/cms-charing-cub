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
import { Eye, Image, ImagePlus, SquarePen } from "lucide-react";
import { BookingDaycare } from "@/types/booking/booking";
import { Badge } from "@/components/ui/badge";

export const bookingDaycareColumns = (
  openUploadDialog: (id: number) => void,
  openViewPaymentProofDialog: (id: number) => void
): ColumnDef<BookingDaycare>[] => [
  {
    accessorKey: "index",
    header: "No",
    cell: ({ row }) => {
      return <p suppressHydrationWarning>{row.index + 1}</p>;
    },
  },
  {
    accessorKey: "name_babies",
    header: "Child Name",
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
    accessorKey: "daycare",
    header: "Daycare",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <p suppressHydrationWarning className="md:line-clamp-2 line-clamp-1">
          {data.daycares?.name}
        </p>
      );
    },
  },
  {
    accessorKey: "daycare",
    header: "Daycare Location",
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
    accessorKey: "start_time",
    header: "Start Booking",
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

      if (data.payment_proof) {
        return (
          <Image
            onClick={() => openViewPaymentProofDialog(data.id)}
            className="h-5 w-5 cursor-pointer"
          />
        );
      }
      return <Badge variant="destructive">Belum Dibayar</Badge>;
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
              className="flex items-center text-gray-700"
            >
              <Eye className="h-4 w-4" />
              <span className="ml-2">See Detail</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => openUploadDialog(data.id)}>
            <div className="flex items-center text-gray-700 cursor-pointer">
              <ImagePlus className="h-4 w-4" />
              <span className="ml-2">Upload Payment</span>
            </div>
          </DropdownMenuItem>
        </ActionButton>
      );
    },
  },
];
