import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DaycareDashboardContent from "@/components/organism/dashboard/daycares/DaycareDashboardContent";

export default function DashboardDaycarePage() {
  return (
    <>
      <DashboardTitle title="Daycare" />
      <DaycareDashboardContent />
    </>
  );
}
