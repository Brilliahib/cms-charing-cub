import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DaycareBookingContent from "@/components/organism/dashboard/daycares/DaycareBookingContent";

export default function DashboardBookingDaycarePage() {
  return (
    <>
      <DashboardTitle title="Booking Daycare" />
      <DaycareBookingContent />
    </>
  );
}
