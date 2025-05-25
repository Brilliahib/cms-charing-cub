"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import ActionButton from "@/components/molecules/datatable/ActionButton";
import Link from "next/link";
import { Eye } from "lucide-react";
import { QuestionTalk } from "@/types/talk/question-talk";

export const cubTalkColumns: ColumnDef<QuestionTalk>[] = [
  {
    accessorKey: "index",
    header: "No",
    cell: ({ row }) => {
      return <p suppressHydrationWarning>{row.index + 1}</p>;
    },
  },
  {
    accessorKey: "title",
    header: "Pertanyaan",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <p suppressHydrationWarning className="md:line-clamp-2 line-clamp-1">
          {data.question_title}
        </p>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Tanggal Dibuat",
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
          <Link
            href={`/cub-talk/${data.id}`}
            className="flex cursor-pointer items-center text-gray-700 hover:underline"
          >
            <Eye className="h-4 w-4" />
            <span className="ml-2">Detail</span>
          </Link>
        </ActionButton>
      );
    },
  },
];
