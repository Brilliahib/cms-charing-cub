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
import {
  ArrowUpDown,
  Check,
  CheckCheck,
  CircleCheck,
  CircleX,
  Eye,
  Timer,
} from "lucide-react";
import { BookingDaycare } from "@/types/booking/booking";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buildFromAppURL, generateFallbackFromName } from "@/utils/misc";
import { Button } from "@/components/ui/button";

export const bookingDaycareFromDaycareColumns = (
  openViewPaymentProofDialog: (id: string) => void,
  openConfirmPaymentDialog: (id: string) => void,
  openConfirmBookingDialog: (id: string) => void
): ColumnDef<BookingDaycare>[] => [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <>
          <div className="flex gap-2 items-center">
            <Avatar className="border border-muted">
              <AvatarImage src={buildFromAppURL(data.user.profile)} />
              <AvatarFallback className="text-gray-700">
                {generateFallbackFromName(data.user.name)}
              </AvatarFallback>
            </Avatar>
            <p suppressHydrationWarning className="line-clamp-2">
              {data.user.name}
            </p>
          </div>
        </>
      );
    },
  },
  {
    accessorKey: "name_babies",
    header: "Child Name",
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
    header: "Special Request",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <p suppressHydrationWarning className="line-clamp-2">
          {data.special_request}
        </p>
      );
    },
  },
  {
    accessorKey: "payment_status",
    header: "Payment Status",
    cell: ({ row }) => {
      const data = row.original;
      switch (data.payment_status) {
        case "paid":
          return (
            <div className="flex items-center gap-2 text-sm">
              <CircleCheck className="text-green-500 h-4 w-4" />
              <span className="text-green-500 capitalize">
                {data.payment_status}
              </span>
            </div>
          );
        case "pending":
          return (
            <div className="flex items-center gap-2 text-sm">
              <Timer className="text-yellow-500 h-4 w-4" />
              <span className="text-yellow-500 capitalize">
                {data.payment_status}
              </span>
            </div>
          );
        case "cancelled":
          return (
            <div className="flex items-center gap-2 text-sm">
              <CircleX className="text-red-500 h-4 w-4" />
              <span className="text-red-500 capitalize">
                {data.payment_status}
              </span>
            </div>
          );
      }
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
    accessorKey: "start_time",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created At
          <ArrowUpDown />
        </Button>
      );
    },
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
