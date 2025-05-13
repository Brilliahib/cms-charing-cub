"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { baseUrl } from "@/utils/app";
import ActionButton from "@/components/molecules/datatable/ActionButton";
import Link from "next/link";
import { Eye, SquarePen, Trash2 } from "lucide-react";
import { Nannies } from "@/types/cub/cub";
import { format } from "date-fns";
import { id } from "date-fns/locale";

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
          {data.user.name}
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
    accessorKey: "contact",
    header: "Kontak",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <p suppressHydrationWarning className="md:line-clamp-2 line-clamp-1">
          {data.contact}
        </p>
      );
    },
  },
  {
    accessorKey: "age",
    header: "Umur",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <p suppressHydrationWarning className="md:line-clamp-2 line-clamp-1">
          {data.age} Tahun
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
    accessorKey: "created_at",
    header: "Tanggal",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <p suppressHydrationWarning>
          {format(new Date(data.created_at), "EEEE, d MMMM yyyy", {
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
          <Link
            href={`/dashboard/daycares/nannies/${data.id}`}
            className="flex cursor-pointer items-center text-gray-700 hover:underline"
          >
            <Eye className="h-4 w-4" />
            <span className="ml-2">Detail</span>
          </Link>
          <Link
            href={`/dashboard/daycares/nannies/${data.id}/edit`}
            className="flex cursor-pointer items-center text-yellow-600 hover:text-yellow-800 hover:underline"
          >
            <SquarePen className="h-4 w-4" />
            <span className="ml-2">Edit</span>
          </Link>
          <div className="flex cursor-pointer items-center text-red-600 hover:text-red-800 hover:underline">
            <Trash2 className="h-4 w-4" />
            <span className="ml-2">Hapus</span>
          </div>
        </ActionButton>
      );
    },
  },
];
