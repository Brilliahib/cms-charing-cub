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
import { Check, CheckCheck, Eye, Image, ImagePlus } from "lucide-react";
import { BookingDaycare } from "@/types/booking/booking";
import { Badge } from "@/components/ui/badge";

export const bookingDaycareFromDaycareColumns = (
  openViewPaymentProofDialog: (id: number) => void,
  openConfirmPaymentDialog: (id: number) => void,
  openConfirmBookingDialog: (id: number) => void
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
    accessorKey: "payment_status",
    header: "Payment Status",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <Badge variant={data.payment_status ? "destructive" : "success"}>
          {data.payment_status ?? "Null"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "payment_method",
    header: "Payment Method",
    cell: ({ row }) => {
      const data = row.original;

      return <p>{data.payment_method ?? "Belum Memilih"}</p>;
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
          <DropdownMenuItem onClick={() => openConfirmPaymentDialog(data.id)}>
            <div className="flex items-center text-gray-700 cursor-pointer">
              <Check className="h-4 w-4" />
              <span className="ml-2">Confirm Payment</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => openConfirmBookingDialog(data.id)}>
            <div className="flex items-center text-gray-700 cursor-pointer">
              <CheckCheck className="h-4 w-4" />
              <span className="ml-2">Approve Booking</span>
            </div>
          </DropdownMenuItem>
        </ActionButton>
      );
    },
  },
];
