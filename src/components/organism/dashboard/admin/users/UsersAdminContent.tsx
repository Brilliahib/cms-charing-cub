"use client";

import { usersColumns } from "@/components/atoms/datacolumn/DataUsers";
import SearchInput from "@/components/atoms/search/SearchInput";
import SearchQueryInput from "@/components/atoms/search/SearchQueryInput";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import PaginationComponent from "@/components/molecules/pagination/Pagination";
import { Button } from "@/components/ui/button";
import { useGetAllUsers } from "@/http/admin/users/get-all-users";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function UsersAdminContent() {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [query, setQuery] = useState(searchParams.get("query") || "");
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("page")) || 1
  );

  const { data, isPending } = useGetAllUsers(
    session?.access_token as string,
    query,
    currentPage,
    {
      enabled: status === "authenticated",
    }
  );

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setCurrentPage(1);
    router.push(`?query=${e.target.value}&page=1`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    router.push(`?query=${query}&page=${page}`);
  };

  const filteredData =
    data?.data.filter((users) =>
      users.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];
  return (
    <>
      <div className="py-8 space-y-8">
        <div className="flex md:flex-row flex-col gap-4 justify-between">
          <SearchQueryInput
            value={query}
            onChange={handleSearch}
            placeholder="Search users..."
          />
          <Link href={"/dashboard/admin/users/create"}>
            <Button className="md:w-fit w-full">Create Users</Button>
          </Link>
        </div>
        <DataTable columns={usersColumns} data={filteredData} />
        <PaginationComponent
          totalItems={data?.pagination.total || 0}
          itemsPerPage={data?.pagination.per_page || 10}
          currentPage={data?.pagination.current_page || 1}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
}
