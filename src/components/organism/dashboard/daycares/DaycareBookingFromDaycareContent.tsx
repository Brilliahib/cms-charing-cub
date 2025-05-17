"use client";

import { bookingDaycareFromDaycareColumns } from "@/components/atoms/datacolumn/DataBookingFromDaycare";
import SearchQueryInput from "@/components/atoms/search/SearchQueryInput";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import PaginationComponent from "@/components/molecules/pagination/Pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetAllBookingDaycareList } from "@/http/daycares/bookings/get-all-booking-daycare-list";
import { useGetAllBokingDaycareIsPaid } from "@/http/daycares/bookings/get-all-booking-daycare-paid";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function DaycareBookingFromDaycareContent() {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [query, setQuery] = useState(searchParams.get("query") || "");
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("page")) || 1
  );
  const [filterStatus, setFilterStatus] = useState("all");

  const { data, isPending } = useGetAllBookingDaycareList(
    session?.access_token as string,
    query,
    currentPage,
    { enabled: status === "authenticated" }
  );

  const { data: bookingPaid } = useGetAllBokingDaycareIsPaid(
    session?.access_token as string,
    query,
    currentPage,
    {
      enabled: status === "authenticated" && filterStatus === "paid",
    }
  );

  useEffect(() => {
    router.push(`?query=${query}&page=${currentPage}&status=${filterStatus}`);
  }, [filterStatus]);

  const [searchQuery, setSearchQuery] = useState("");

  const selectedData =
    filterStatus === "paid" ? bookingPaid?.data || [] : data?.data || [];

  const filteredData = selectedData.filter((daycare) =>
    daycare.name_babies.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setCurrentPage(1);
    router.push(`?query=${e.target.value}&page=1`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    router.push(`?query=${query}&page=${page}`);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterStatus(e.target.value);
  };

  return (
    <>
      <div className="py-4 space-y-8">
        <div className="flex flex-col md:justify-between md:flex-row md:items-center gap-4 w-full">
          <SearchQueryInput
            value={query}
            onChange={handleSearch}
            placeholder="Cari berdasarkan nama anak"
            className="md:w-[350px]"
          />
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="md:w-[200px] w-full">
              <SelectValue placeholder="Filter pembayaran" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua</SelectItem>
              <SelectItem value="paid">Sudah Dibayar</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <DataTable
          columns={bookingDaycareFromDaycareColumns()}
          data={filteredData}
        />
        <PaginationComponent
          totalItems={
            filterStatus === "paid"
              ? bookingPaid?.pagination.total || 0
              : data?.pagination.total || 0
          }
          itemsPerPage={
            filterStatus === "paid"
              ? bookingPaid?.pagination.per_page || 10
              : data?.pagination.per_page || 10
          }
          currentPage={
            filterStatus === "paid"
              ? bookingPaid?.pagination.current_page || 1
              : data?.pagination.current_page || 1
          }
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
}
