"use client";

import { nanniesColumns } from "@/components/atoms/datacolumn/DataNannies";
import SearchInput from "@/components/atoms/search/SearchInput";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import { useGetAllNanniesFromDaycares } from "@/http/daycares/nannies/get-all-nannies-from-daycare";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function DaycareNanniesListContent() {
  const { data: session, status } = useSession();
  const { data, isPending } = useGetAllNanniesFromDaycares(
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    }
  );

  const [searchQuery, setSearchQuery] = useState("");

  const filteredData =
    data?.data.filter((users) =>
      users.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];
  return (
    <>
      <div className="py-8 space-y-8">
        <div className="flex justify-between items-center">
          <SearchInput
            onSearch={setSearchQuery}
            props="Search nannies..."
            className="min-w-[250px]"
          />
          <div className="flex gap-4"></div>
        </div>
        <DataTable columns={nanniesColumns} data={filteredData} />
      </div>
    </>
  );
}
