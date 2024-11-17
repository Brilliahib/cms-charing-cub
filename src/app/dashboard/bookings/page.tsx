import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import BookingDashboardContent from "@/components/organism/dashboard/booking/BookingDashboardContent";

export default function DashboardBookingPage() {
  return (
    <>
      <DashboardTitle title="Booking List" />
      <BookingDashboardContent />
    </>
  );
}
