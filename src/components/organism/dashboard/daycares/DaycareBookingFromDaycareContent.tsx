"use client";

import { bookingDaycareFromDaycareColumns } from "@/components/atoms/datacolumn/DataBookingFromDaycare";
import SearchQueryInput from "@/components/atoms/search/SearchQueryInput";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import PaginationComponent from "@/components/molecules/pagination/Pagination";
import { useGetAllBookingDaycareList } from "@/http/daycares/bookings/get-all-booking-daycare-list";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function DaycareBookingFromDaycareContent() {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [query, setQuery] = useState(searchParams.get("query") || "");
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("page")) || 1
  );

  const { data, isPending } = useGetAllBookingDaycareList(
    session?.access_token as string,
    query,
    currentPage,
    { enabled: status === "authenticated" }
  );

  const [searchQuery, setSearchQuery] = useState("");

  const filteredData =
    data?.data.filter((daycares) =>
      daycares.name_babies.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setCurrentPage(1);
    router.push(`?query=${e.target.value}&page=1`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    router.push(`?query=${query}&page=${page}`);
  };
  return (
    <>
      <div className="py-4 space-y-8">
        <div className="flex w-full">
          <SearchQueryInput
            value={query}
            onChange={handleSearch}
            placeholder="Cari berdasarkan nama anak"
            className="md:w-[350px]"
          />
        </div>
        <DataTable
          columns={bookingDaycareFromDaycareColumns()}
          data={filteredData}
        />
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
