"use client";

import { bookingDaycareColumns } from "@/components/atoms/datacolumn/DataBookingDaycare";
import SearchInput from "@/components/atoms/search/SearchInput";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import { useGetAllBookingFromDaycares } from "@/http/daycares/bookings/get-all-booking-from-daycare";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function DaycareBookingContent() {
  const { data: session, status } = useSession();
  const { data, isPending } = useGetAllBookingFromDaycares(
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
          <SearchInput onSearch={setSearchQuery} props="Search Booking..." />
        </div>
        <DataTable columns={bookingDaycareColumns} data={filteredData} />
      </div>
    </>
  );
}
