"use client";

import { daycareColumns } from "@/components/atoms/datacolumn/DataDaycare";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import { Button } from "@/components/ui/button";
import { useGetAllDaycare } from "@/http/daycares/get-all-daycares";
import Link from "next/link";

export default function DaycareAdminContent() {
  const { data, isPending } = useGetAllDaycare();
  return (
    <>
      <div className="py-8 space-y-8">
        <div>
          <Link href={"/dashboard/admin/daycares/create"}>
            <Button>Tambah Daycare</Button>
          </Link>
        </div>
        <DataTable columns={daycareColumns} data={data?.data || []} />
      </div>
    </>
  );
}
