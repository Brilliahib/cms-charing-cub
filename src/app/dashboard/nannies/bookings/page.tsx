import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import NanniesBookingDashboardContent from "@/components/organism/dashboard/nannies/NanniesBookingDashboardContent";

export default function DashboardNanniesBookingPage() {
  return (
    <>
      <DashboardTitle
        title="Daftar Booking"
        body="Menampilkan daftar booking dari Pengguna"
      />
      <NanniesBookingDashboardContent />
    </>
  );
}
