"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Article } from "@/types/article/article";
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

export const articleColumns: ColumnDef<Article>[] = [
  {
    accessorKey: "index",
    header: "No",
    cell: ({ row }) => {
      return <p suppressHydrationWarning>{row.index + 1}</p>;
    },
  },
  {
    accessorKey: "title",
    header: "Judul",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <p suppressHydrationWarning className="md:line-clamp-2 line-clamp-1">
          {data.title}
        </p>
      );
    },
  },
  {
    accessorKey: "content",
    header: "Konten",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div suppressHydrationWarning className="line-clamp-2">
          <div
            dangerouslySetInnerHTML={{ __html: data.content }}
            className="prose"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <Image
          src={`${baseUrl}/${data.image}`}
          alt={data.title}
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
