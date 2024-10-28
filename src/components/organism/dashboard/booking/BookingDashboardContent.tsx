"use client";

import { bookingNanniesColumns } from "@/components/atoms/datacolumn/DataBooking";
import SearchInput from "@/components/atoms/search/SearchInput";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import { useGetBookingNannies } from "@/http/booking/get-booking-nannies";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function BookingDashboardContent() {
  const { data: session, status } = useSession();
  const { data, isPending } = useGetBookingNannies(
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
      <div className="py-8 space-y-8">
        <div className="flex justify-between">
          <SearchInput onSearch={setSearchQuery} />
        </div>
        <DataTable columns={bookingNanniesColumns} data={filteredData} />
      </div>
    </>
  );
}
