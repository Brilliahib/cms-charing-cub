"use client";

import { usersColumns } from "@/components/atoms/datacolumn/DataUsers";
import SearchInput from "@/components/atoms/search/SearchInput";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import { Button } from "@/components/ui/button";
import { useGetAllUsers } from "@/http/admin/users/get-all-users";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function UsersAdminContent() {
  const { data: session, status } = useSession();
  const { data, isPending } = useGetAllUsers(session?.access_token as string, {
    enabled: status === "authenticated",
  });

  const [searchQuery, setSearchQuery] = useState("");

  const filteredData =
    data?.data.filter((users) =>
      users.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];
  return (
    <>
      <div className="py-8 space-y-8">
        <div className="flex md:flex-row flex-col gap-4 justify-between">
          <SearchInput
            onSearch={setSearchQuery}
            className="min-w-[250px]"
            props="Search users..."
          />
          <Link href={"/dashboard/admin/users/create"}>
            <Button className="md:w-fit w-full">Create Users</Button>
          </Link>
        </div>
        <DataTable columns={usersColumns} data={filteredData} />
      </div>
    </>
  );
}
