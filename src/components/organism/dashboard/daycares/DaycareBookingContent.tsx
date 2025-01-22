"use client";

import { bookingDaycareColumns } from "@/components/atoms/datacolumn/DataBookingDaycare";
import DialogViewPaymentProofDaycare from "@/components/atoms/dialog/DialogPaymentProofDaycareDetail";
import DialogUploadPaymentProofDaycareType from "@/components/atoms/dialog/DialogUploadPaymentProofDaycare";
import SearchInput from "@/components/atoms/search/SearchInput";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import PaginationComponent from "@/components/molecules/pagination/Pagination";
import { useGetAllBookingFromDaycares } from "@/http/daycares/bookings/get-all-booking-from-daycare";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function DaycareBookingContent() {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [query, setQuery] = useState(searchParams.get("query") || "");

  const { data, isPending } = useGetAllBookingFromDaycares(
    session?.access_token as string,
    query,
    { enabled: status === "authenticated" }
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialogViewPaymentProofOpen, setIsDialogViewPaymentProofOpen] =
    useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(
    null
  );
  const [selectedPaymentProofId, setSelectedPaymentProofId] = useState<
    string | null
  >(null);

  const openUploadDialog = (id: string) => {
    setSelectedBookingId(id);
    setIsDialogOpen(true);
  };

  const openViewPaymentDialog = (id: string) => {
    setSelectedPaymentProofId(id);
    setIsDialogViewPaymentProofOpen(true);
  };

  const filteredData =
    data?.data.filter((article) =>
      article.name_babies.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("page")) || 1
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
  return (
    <>
      <div className="py-4 space-y-8">
        <div className="flex w-full">
          <SearchInput onSearch={setSearchQuery} props="Search Booking..." />
        </div>
        <DataTable
          columns={bookingDaycareColumns(
            openUploadDialog,
            openViewPaymentDialog
          )}
          data={filteredData}
        />
        <PaginationComponent
          totalItems={data?.pagination.total || 0}
          itemsPerPage={data?.pagination.per_page || 10}
          currentPage={data?.pagination.current_page || 1}
          onPageChange={handlePageChange}
        />
      </div>
      {selectedBookingId && (
        <DialogUploadPaymentProofDaycareType
          open={isDialogOpen}
          setOpen={setIsDialogOpen}
          id={selectedBookingId}
        />
      )}
      {selectedPaymentProofId && (
        <DialogViewPaymentProofDaycare
          open={isDialogViewPaymentProofOpen}
          setOpen={setIsDialogViewPaymentProofOpen}
          id={selectedPaymentProofId}
        />
      )}
    </>
  );
}
