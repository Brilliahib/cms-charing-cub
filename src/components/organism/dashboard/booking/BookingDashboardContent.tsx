"use client";

import { bookingUserNanniesColumns } from "@/components/atoms/datacolumn/DataBooking";
import SearchInput from "@/components/atoms/search/SearchInput";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import { useGetBookingUserNannies } from "@/http/booking/get-booking-nannies";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function BookingDashboardContent() {
  const { data: session, status } = useSession();
  const { data, isPending } = useGetBookingUserNannies(
    session?.access_token as string,
    { enabled: status === "authenticated" }
  );
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData =
    data?.data.filter((article) =>
      article.name_babies.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];
  return (
    <>
      <div className="py-4 space-y-8">
        <div className="flex w-full">
          <SearchInput
            onSearch={setSearchQuery}
            props="Cari berdasarkan nama"
          />
        </div>
        <DataTable columns={bookingUserNanniesColumns} data={filteredData} />
      </div>
    </>
  );
}
