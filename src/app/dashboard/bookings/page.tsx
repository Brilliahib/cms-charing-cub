import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import BookingDashboardContent from "@/components/organism/dashboard/booking/BookingDashboardContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Booking",
};

export default function DashboardBookingPage() {
  return (
    <>
      <DashboardTitle title="Booking List" />
      <BookingDashboardContent />
    </>
  );
}
