"use client";

import AlertApproveBookingDaycare from "@/components/atoms/alert/AlertApproveBookingDaycare";
import AlertApprovePaymentDaycare from "@/components/atoms/alert/AlertApprovePaymentDaycare";
import { bookingDaycareFromDaycareColumns } from "@/components/atoms/datacolumn/DataBookingFromDaycare";
import DialogViewPaymentProofDaycare from "@/components/atoms/dialog/DialogPaymentProofDaycareDetail";
import SearchQueryInput from "@/components/atoms/search/SearchQueryInput";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import PaginationComponent from "@/components/molecules/pagination/Pagination";
import { useApproveBookingDaycare } from "@/http/daycares/bookings/add-approve-booking-daycare";
import { useApprovePaymentDaycare } from "@/http/daycares/bookings/add-confirm-payment-daycare";
import { useGetAllBookingDaycareList } from "@/http/daycares/bookings/get-all-booking-daycare-list";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function DaycareBookingFromDaycareContent() {
  const { data: session, status } = useSession();
  const queryClient = useQueryClient();
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
  const approvePaymentDaycare = useApprovePaymentDaycare({
    onSuccess: () => {
      toast.success("Payment Approve Successfully");
      setIsDialogPaymentOpen(false);
      queryClient.invalidateQueries({
        queryKey: ["booking-daycares-list"],
      });
    },
    onError: (error: AxiosError<any>) => {
      toast.error("Failed to approve payment", {
        description: error.response?.data.message,
      });
    },
  });

  const approveBookingDaycare = useApproveBookingDaycare({
    onSuccess: () => {
      toast.success("Booking Approve Successfully");
      setIsDialogPaymentOpen(false);
      queryClient.invalidateQueries({
        queryKey: ["booking-daycares-list"],
      });
    },
    onError: (error: AxiosError<any>) => {
      toast.error("Failed to approve booking", {
        description: error.response?.data.message,
      });
    },
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogViewPaymentProofOpen, setIsDialogViewPaymentProofOpen] =
    useState(false);
  const [isDialogPaymentOpen, setIsDialogPaymentOpen] = useState(false);
  const [isDialogBookingOpen, setIsDialogBookingOpen] = useState(false);
  const [selectedPaymentId, setSelectedPaymentId] = useState<string | null>(
    null
  );
  const [selectedBookingId, setSelectedBokingId] = useState<string | null>(
    null
  );
  const [selectedPaymentProofId, setSelectedPaymentProofId] = useState<
    string | null
  >(null);

  const openViewPaymentDialog = (id: string) => {
    setSelectedPaymentProofId(id);
    setIsDialogViewPaymentProofOpen(true);
  };

  const openConfirmPaymentDialog = (id: string) => {
    setSelectedPaymentId(id);
    setIsDialogPaymentOpen(true);
  };

  const openConfirmBookingDialog = (id: string) => {
    setSelectedBokingId(id);
    setIsDialogBookingOpen(true);
  };

  const handleApprovePayment = () => {
    if (selectedPaymentId) {
      approvePaymentDaycare.mutate(selectedPaymentId.toString());
    }
  };

  const handleApproveBooking = () => {
    if (selectedBookingId) {
      approveBookingDaycare.mutate(selectedBookingId.toString());
    }
  };

  const filteredData =
    data?.data.filter((article) =>
      article.name_babies.toLowerCase().includes(searchQuery.toLowerCase())
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
            placeholder="Search by child name or parent name..."
            className="md:w-[350px]"
          />
        </div>
        <DataTable
          columns={bookingDaycareFromDaycareColumns(
            openViewPaymentDialog,
            openConfirmPaymentDialog,
            openConfirmBookingDialog
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
      {selectedPaymentProofId && (
        <DialogViewPaymentProofDaycare
          open={isDialogViewPaymentProofOpen}
          setOpen={setIsDialogViewPaymentProofOpen}
          id={selectedPaymentProofId}
        />
      )}

      {selectedPaymentId && (
        <AlertApprovePaymentDaycare
          open={isDialogPaymentOpen}
          setOpen={setIsDialogPaymentOpen}
          confirmApprove={handleApprovePayment}
        />
      )}

      {selectedBookingId && (
        <AlertApproveBookingDaycare
          open={isDialogBookingOpen}
          setOpen={setIsDialogBookingOpen}
          confirmApprove={handleApproveBooking}
        />
      )}
    </>
  );
}
