import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import BookingDashboardContent from "@/components/organism/dashboard/booking/BookingDashboardContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Booking Nannies",
};

export default function DashboardBookingNanniesPage() {
  return (
    <>
      <DashboardTitle
        title="Booking Nannies"
        body="Menampilkan daftar riwayat booking nannies Anda"
      />
      <BookingDashboardContent />
    </>
  );
}
