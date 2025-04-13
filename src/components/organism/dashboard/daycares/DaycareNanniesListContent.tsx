"use client";

import { nanniesColumns } from "@/components/atoms/datacolumn/DataNannies";
import SearchInput from "@/components/atoms/search/SearchInput";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import { Button } from "@/components/ui/button";
import { useGetAllNanniesFromDaycares } from "@/http/daycares/nannies/get-all-nannies-from-daycare";
import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
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
      users.user.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];
  return (
    <>
      <div className="py-4 space-y-8">
        <div className="flex justify-between items-center">
          <SearchInput
            onSearch={setSearchQuery}
            props="Cari berdasarkan nama"
            className="min-w-[350px]"
          />
          <div className="flex gap-4">
            <Link href={"/dashboard/daycares/nannies/create"}>
              <Button>
                <Plus /> Create Nanny
              </Button>
            </Link>
          </div>
        </div>
        <DataTable columns={nanniesColumns} data={filteredData} />
      </div>
    </>
  );
}
