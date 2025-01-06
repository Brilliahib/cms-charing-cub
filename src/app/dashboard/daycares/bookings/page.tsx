import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DaycareBookingContent from "@/components/organism/dashboard/daycares/DaycareBookingContent";
import DaycareBookingFromDaycareContent from "@/components/organism/dashboard/daycares/DaycareBookingFromDaycareContent";

export default function DashboardBookingDaycarePage() {
  return (
    <>
      <DashboardTitle title="Booking" />
      <DaycareBookingFromDaycareContent />
    </>
  );
}
