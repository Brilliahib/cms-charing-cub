"use client";

import { nanniesColumns } from "@/components/atoms/datacolumn/DataNannies";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import { Button } from "@/components/ui/button";
import { useGetAllNannies } from "@/http/cub/care/get-all-nannies";
import Link from "next/link";

export default function NanniesAdminContent() {
  const { data, isPending } = useGetAllNannies();
  return (
    <>
      <div className="py-8 space-y-8">
        <div>
          <Link href={"/dashboard/admin/nannies/create"}>
            <Button>Tambah Nanny</Button>
          </Link>
        </div>
        <DataTable columns={nanniesColumns} data={data?.data || []} />
      </div>
    </>
  );
}
