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

export const bookingNanniesColumns: ColumnDef<BookingNannies>[] = [
  {
    accessorKey: "index",
    header: "No",
    cell: ({ row }) => {
      return <p suppressHydrationWarning>{row.index + 1}</p>;
    },
  },
  //   {
  //     accessorKey: "name",
  //     header: "Nama Nanny",
  //     cell: ({ row }) => {
  //       const data = row.original;
  //       return (
  //         <p suppressHydrationWarning className="md:line-clamp-2 line-clamp-1">
  //           {data.nanny?.name}
  //         </p>
  //       );
  //     },
  //   },
  {
    accessorKey: "gender",
    header: "Foto Nanny",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <Image
          src={`${baseUrl}/${data.nannies?.images}`}
          alt={data.nannies?.name ?? ""}
          width={1000}
          height={1000}
          className="max-h-[100px] w-fit bg-secondary rounded-md"
        />
      );
    },
  },
  {
    accessorKey: "price_half",
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
    accessorKey: "price_full",
    header: "Status Diterima",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <Badge variant={data.is_approved ? "success" : "destructive"}>
          {data.is_approved ? "Diterima" : "Belum Diterima"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "price_full",
    header: "Status Pembayaran",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <Badge variant={data.is_approved ? "success" : "destructive"}>
          {data.is_approved ? "Dibayar" : "Belum Dicek"}
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
    accessorKey: "price_full",
    header: "Tanggal Booking",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <p suppressHydrationWarning className="md:line-clamp-2 line-clamp-1">
          {format(data.created_at, "EEEE, d MMMM yyyy", {
            locale: id,
          })}
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
              href={`/dashboard/admin/nannies/${data.id}/edit`}
              className="flex items-center text-gray-700"
            >
              <SquarePen className="h-4 w-4" />
              <span className="ml-2">Edit Nannies</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              href={`/dashboard/admin/nannies/${data.id}`}
              className="flex items-center text-gray-700"
            >
              <Eye className="h-4 w-4" />
              <span className="ml-2">Detail Nannies</span>
            </Link>
          </DropdownMenuItem>
        </ActionButton>
      );
    },
  },
];
