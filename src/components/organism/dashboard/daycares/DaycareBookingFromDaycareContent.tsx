"use client";

import AlertApproveBookingDaycare from "@/components/atoms/alert/AlertApproveBookingDaycare";
import AlertApprovePaymentDaycare from "@/components/atoms/alert/AlertApprovePaymentDaycare";
import { bookingDaycareFromDaycareColumns } from "@/components/atoms/datacolumn/DataBookingFromDaycare";
import DialogViewPaymentProofDaycare from "@/components/atoms/dialog/DialogPaymentProofDaycareDetail";
import SearchInput from "@/components/atoms/search/SearchInput";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import { useApproveBookingDaycare } from "@/http/daycares/bookings/add-approve-booking-daycare";
import { useApprovePaymentDaycare } from "@/http/daycares/bookings/add-confirm-payment-daycare";
import { useGetAllBookingDaycareList } from "@/http/daycares/bookings/get-all-booking-daycare-list";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";

export default function DaycareBookingFromDaycareContent() {
  const { data: session, status } = useSession();
  const queryClient = useQueryClient();
  const { data, isPending } = useGetAllBookingDaycareList(
    session?.access_token as string,
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
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialogViewPaymentProofOpen, setIsDialogViewPaymentProofOpen] =
    useState(false);
  const [isDialogPaymentOpen, setIsDialogPaymentOpen] = useState(false);
  const [isDialogBookingOpen, setIsDialogBookingOpen] = useState(false);
  const [selectedPaymentId, setSelectedPaymentId] = useState<number | null>(
    null
  );
  const [selectedBookingId, setSelectedBokingId] = useState<number | null>(
    null
  );
  const [selectedPaymentProofId, setSelectedPaymentProofId] = useState<
    number | null
  >(null);

  const openViewPaymentDialog = (id: number) => {
    setSelectedPaymentProofId(id);
    setIsDialogViewPaymentProofOpen(true);
  };

  const openConfirmPaymentDialog = (id: number) => {
    setSelectedPaymentId(id);
    setIsDialogPaymentOpen(true);
  };

  const openConfirmBookingDialog = (id: number) => {
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
  return (
    <>
      <div className="py-4 space-y-8">
        <div className="flex w-full">
          <SearchInput onSearch={setSearchQuery} props="Search Booking..." />
        </div>
        <DataTable
          columns={bookingDaycareFromDaycareColumns(
            openViewPaymentDialog,
            openConfirmPaymentDialog,
            openConfirmBookingDialog
          )}
          data={filteredData}
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
