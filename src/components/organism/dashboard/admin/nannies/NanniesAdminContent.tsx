"use client";

import { nanniesColumns } from "@/components/atoms/datacolumn/DataNannies";
import SearchInput from "@/components/atoms/search/SearchInput";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import { Button } from "@/components/ui/button";
import { useGetAllNannies } from "@/http/cub/care/get-all-nannies";
import Link from "next/link";
import { useState } from "react";

export default function NanniesAdminContent() {
  const { data } = useGetAllNannies();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData =
    data?.data.filter((nanny) =>
      nanny.user.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  return (
    <>
      <div className="py-8 space-y-8">
        <div className="flex md:flex-row flex-col gap-4 justify-between">
          <SearchInput
            onSearch={setSearchQuery}
            className="min-w-[250px]"
            props="Cari nannies..."
          />
          <Link href={"/dashboard/admin/nannies/create"}>
            <Button className="md:w-fit w-full">Tambah Nanny</Button>
          </Link>
        </div>
        <DataTable columns={nanniesColumns} data={filteredData} />
      </div>
    </>
  );
}
