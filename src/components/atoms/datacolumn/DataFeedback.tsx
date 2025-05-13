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
import { Feedback } from "@/types/feedbacks/feedbacks";

export const feedbackColumns: ColumnDef<Feedback>[] = [
  {
    accessorKey: "index",
    header: "No",
    cell: ({ row }) => {
      return <p suppressHydrationWarning>{row.index + 1}</p>;
    },
  },
  {
    accessorKey: "rate",
    header: "Rate",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <p suppressHydrationWarning className="md:line-clamp-2 line-clamp-1">
          {data.rate}
        </p>
      );
    },
  },
  {
    accessorKey: "comment",
    header: "Komentar",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <p suppressHydrationWarning className="md:line-clamp-2 line-clamp-1">
          {data.comment}
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
              href={`/dashboard/admin/feedback/${data.id}`}
              className="flex items-center text-gray-700"
            >
              <Eye className="h-4 w-4" />
              <span className="ml-2">Detail Masukan</span>
            </Link>
          </DropdownMenuItem>
        </ActionButton>
      );
    },
  },
];
