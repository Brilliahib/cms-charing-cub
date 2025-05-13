import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DaycareBookingFromDaycareContent from "@/components/organism/dashboard/daycares/DaycareBookingFromDaycareContent";

export default function DashboardBookingDaycarePage() {
  return (
    <>
      <DashboardTitle
        title="Daftar Booking"
        body="Menampikan daftar booking dari Pengguna"
      />
      <DaycareBookingFromDaycareContent />
    </>
  );
}
