import BookingDetailDashboardContent from "@/components/organism/dashboard/booking/BookingDetailDashboardContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Detail Booking",
};

interface DashboardBookingDetailParams {
  params: { id: number };
}

export default function DashboardBookingDetailPage({
  params,
}: DashboardBookingDetailParams) {
  return (
    <>
      <BookingDetailDashboardContent id={params.id} />
    </>
  );
}
