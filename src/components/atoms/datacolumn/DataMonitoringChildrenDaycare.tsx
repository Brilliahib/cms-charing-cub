"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import ActionButton from "@/components/molecules/datatable/ActionButton";
import { Eye, SquarePen, Trash2 } from "lucide-react";
import Link from "next/link";
import { MonitoringChildrenDaycare } from "@/types/daycares/monitoring/monitoring-children-daycare";
import { Badge } from "@/components/ui/badge";

export const monitoringChildrenDaycareColumns: ColumnDef<MonitoringChildrenDaycare>[] =
  [
    {
      accessorKey: "index",
      header: "No",
      cell: ({ row }) => {
        return <p suppressHydrationWarning>{row.index + 1}</p>;
      },
    },
    {
      accessorKey: "user.name",
      header: "Pengguna",
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
      accessorKey: "is_active",
      header: "Status",
      cell: ({ row }) => {
        const data = row.original;
        const isActive = data.is_active;

        return (
          <Badge
            variant={isActive ? "default" : "outline"}
            className={`text-xs font-medium hover:bg-none ${
              isActive ? "bg-green-500 text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            {isActive ? "Aktif" : "Tidak Aktif"}
          </Badge>
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
              href={`/dashboard/daycares/monitoring/${data.id}`}
              className="flex cursor-pointer items-center text-gray-700 hover:underline"
            >
              <Eye className="h-4 w-4" />
              <span className="ml-2">Detail</span>
            </Link>
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
