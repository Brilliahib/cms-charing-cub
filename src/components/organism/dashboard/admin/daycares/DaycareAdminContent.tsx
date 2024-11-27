"use client";

import { daycareColumns } from "@/components/atoms/datacolumn/DataDaycare";
import SearchInput from "@/components/atoms/search/SearchInput";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import { Button } from "@/components/ui/button";
import { useGetAllDaycare } from "@/http/daycares/get-all-daycares";
import Link from "next/link";
import { useState } from "react";

export default function DaycareAdminContent() {
  const { data, isPending } = useGetAllDaycare();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData =
    data?.data.filter((daycare) =>
      daycare.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];
  return (
    <>
      <div className="py-8 space-y-8">
        <div className="flex justify-between">
          <SearchInput
            onSearch={setSearchQuery}
            props="Search daycare..."
            className="min-w-[250px]"
          />
          <Link href={"/dashboard/admin/daycares/create"}>
            <Button>Tambah Daycare</Button>
          </Link>
        </div>
        <DataTable columns={daycareColumns} data={filteredData} />
      </div>
    </>
  );
}
