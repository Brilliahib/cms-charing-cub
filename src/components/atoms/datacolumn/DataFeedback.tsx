"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import ActionButton from "@/components/molecules/datatable/ActionButton";
import { Eye, SquarePen, Trash2 } from "lucide-react";
import { Feedback } from "@/types/feedbacks/feedbacks";
import Link from "next/link";

interface FeedbackColumnsProps {
  detailFeedbackHandler: (data: Feedback) => void;
}

export const feedbackColumns = (
  props: FeedbackColumnsProps
): ColumnDef<Feedback>[] => [
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
    accessorKey: "created_at",
    header: "Tanggal",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <p suppressHydrationWarning>
          {format(new Date(data.created_at), "EEEE, d MMMM yyyy HH:mm:ss", {
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
          <div
            onClick={() => props.detailFeedbackHandler(data)}
            className="flex cursor-pointer items-center text-gray-700 hover:underline"
          >
            <Eye className="h-4 w-4" />
            <span className="ml-2">Detail</span>
          </div>
          <Link
            href={`/dashboard/admin/feedback/${data.id}/edit`}
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
