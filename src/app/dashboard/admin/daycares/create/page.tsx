import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DaycareCreateContent from "@/components/organism/dashboard/admin/daycares/DaycareAdminCreateContent";

export default function DashboardAdminCreateDaycarePage() {
  return (
    <>
      <DashboardTitle title="Create New Daycare" />
      <DaycareCreateContent />
    </>
  );
}
