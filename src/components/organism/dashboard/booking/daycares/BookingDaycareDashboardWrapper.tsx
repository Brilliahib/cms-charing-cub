"use client";

import { bookingDaycareColumns } from "@/components/atoms/datacolumn/DataBookingDaycare";
import SearchInput from "@/components/atoms/search/SearchInput";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import PaginationComponent from "@/components/molecules/pagination/Pagination";
import { useGetAllBookingFromDaycares } from "@/http/daycares/bookings/get-all-booking-from-daycare";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function BookingDaycareDashboardWrapper() {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [query, setQuery] = useState(searchParams.get("query") || "");
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("page")) || 1
  );

  const { data } = useGetAllBookingFromDaycares(
    session?.access_token as string,
    query,
    currentPage,
    { enabled: status === "authenticated" }
  );
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData =
    data?.data.filter((article) =>
      article.name_babies.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    router.push(`?query=${query}&page=${page}`);
  };
  return (
    <>
      <div className="py-4 space-y-8">
        <div className="flex w-full">
          <SearchInput
            onSearch={setSearchQuery}
            props="Cari berdasarkan nama"
          />
        </div>
        <DataTable columns={bookingDaycareColumns} data={filteredData} />
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
