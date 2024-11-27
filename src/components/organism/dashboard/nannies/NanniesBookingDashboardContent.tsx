"use client";

import ApproveBookingNanniesDialog from "@/components/atoms/alert/AlertApproveBookingNannies";
import { bookingNanniesColumns } from "@/components/atoms/datacolumn/DataBookingNannies";
import SearchInput from "@/components/atoms/search/SearchInput";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import { useToast } from "@/hooks/use-toast";
import { useApproveBookingNannies } from "@/http/nannies/add-approve-booking";
import { useGetBookingNannies } from "@/http/nannies/get-all-booking-nannies";
import { BookingNannies } from "@/types/booking/booking";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function NanniesBookingDashboardContent() {
  const { data: session, status } = useSession();
  const [selectedBooking, setSelectedBooking] = useState<BookingNannies | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState("");

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data, isPending } = useGetBookingNannies(
    session?.access_token as string,
    { enabled: status === "authenticated" }
  );

  const [openAlertDelete, setOpenAlertDelete] = useState<boolean>(false);

  const { mutate: bookingNannies, isPending: isDeletePending } =
    useApproveBookingNannies({
      onSuccess: () => {
        setSelectedBooking(null);
        toast({
          title: "Successfully approved booking!",
          variant: "success",
        });
        queryClient.invalidateQueries({
          queryKey: ["booking-nannies-list"],
        });
      },
      onError: (error) => {
        toast({
          title: "Failed to approve booking!",
          variant: "destructive",
          description: error.response?.data.message,
        });
      },
    });

  const approveBookingNanniesHandler = (data: BookingNannies) => {
    setSelectedBooking(data);
    setOpenAlertDelete(true);
  };

  const handleApproveBooking = () => {
    if (selectedBooking?.id) {
      bookingNannies(selectedBooking.id.toString());
    }
  };

  const filteredData =
    data?.data.filter((booking) =>
      booking.name_babies.toLowerCase().includes(searchQuery.toLowerCase())
    ) ?? [];

  const dataHandler = filteredData.map((booking) => ({
    ...booking,
    approveBookingNanniesHandler,
  }));

  return (
    <>
      <div className="md:py-8 space-y-8">
        <div className="flex w-full">
          <SearchInput onSearch={setSearchQuery} props="Search Booking" />
        </div>
        <DataTable columns={bookingNanniesColumns} data={dataHandler} />
      </div>
      <ApproveBookingNanniesDialog
        open={openAlertDelete}
        setOpen={setOpenAlertDelete}
        confirmApprove={handleApproveBooking}
        data={selectedBooking}
        isPending={isDeletePending}
      />
    </>
  );
}
