import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import BookingDaycareDashboardWrapper from "@/components/organism/dashboard/booking/daycares/BookingDaycareDashboardWrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Booking Daycare",
};

export default function DashboardBookingDaycarePage() {
  return (
    <>
      <DashboardTitle
        title="Booking Daycare"
        body="Menampilkan daftar riwayat booking daycare Anda"
      />
      <BookingDaycareDashboardWrapper />
    </>
  );
}
