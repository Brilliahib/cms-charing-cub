"use client";

import { ColumnDef } from "@tanstack/react-table";
import ActionButton from "@/components/molecules/datatable/ActionButton";
import {
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Check } from "lucide-react";
import { BookingNannies } from "@/types/booking/booking";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";

interface BookingNanniesProps extends BookingNannies {
  approveBookingNanniesHandler: (data: BookingNanniesProps) => void;
}

const ActionsCell = ({ data }: { data: BookingNanniesProps }) => {
  return (
    <>
      <ActionButton>
        <DropdownMenuLabel>Action</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-green-500 cursor-pointer focus:text-green-700"
          onClick={() => data.approveBookingNanniesHandler(data)}
        >
          <Check className="h-4 w-4 " />
          <span className="ml-2 ">Approve Booking</span>
        </DropdownMenuItem>
      </ActionButton>
    </>
  );
};

export const bookingNanniesColumns: ColumnDef<BookingNanniesProps>[] = [
  {
    accessorKey: "index",
    header: "No",
    cell: ({ row }) => {
      return <p suppressHydrationWarning>{row.index + 1}</p>;
    },
  },
  {
    accessorKey: "name",
    header: "Customer",
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
    cell: ({ row }) => <ActionsCell data={row.original} />,
  },
];
