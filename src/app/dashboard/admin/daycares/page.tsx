import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DaycareAdminContent from "@/components/organism/dashboard/admin/daycares/DaycareAdminContent";

export default function DashboardAdminDaycarePage() {
  return (
    <>
      <DashboardTitle title="Daycares" />
      <DaycareAdminContent />
    </>
  );
}
