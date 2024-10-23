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
import { Nannies } from "@/types/cub/cub";

export const nanniesColumns: ColumnDef<Nannies>[] = [
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
          {data.name}
        </p>
      );
    },
  },
  {
    accessorKey: "gender",
    header: "Jenis Kelamin",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <p suppressHydrationWarning className="md:line-clamp-2 line-clamp-1">
          {data.gender == "female" ? "Perempuan" : "Laki-Laki"}
        </p>
      );
    },
  },
  {
    accessorKey: "price_half",
    header: "Harga Half Day",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <p suppressHydrationWarning className="md:line-clamp-2 line-clamp-1">
          {data.price_half}
        </p>
      );
    },
  },
  {
    accessorKey: "price_full",
    header: "Harga Full Day",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <p suppressHydrationWarning className="md:line-clamp-2 line-clamp-1">
          {data.price_full}
        </p>
      );
    },
  },
  {
    accessorKey: "images",
    header: "Foto",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <Image
          src={`${baseUrl}/${data.images}`}
          alt={data.name}
          width={1000}
          height={1000}
          className="max-h-[100px] w-fit"
        />
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
