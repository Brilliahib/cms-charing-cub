import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import BookingDetailDaycareDashboardContent from "@/components/organism/dashboard/booking/daycares/BookingDetailDaycareDashboardWrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Detail Booking Daycare",
};

interface DaycareBookingDetailProps {
  params: { id: string };
}

export default function DashboardDaycareBookingDetailPage({
  params,
}: DaycareBookingDetailProps) {
  return (
    <>
      <DashboardTitle title="Detail Booking" />
      <BookingDetailDaycareDashboardContent id={params.id} />
    </>
  );
}
