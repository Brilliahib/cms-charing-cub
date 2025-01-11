import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DaycareCreateContent from "@/components/organism/dashboard/admin/daycares/DaycareAdminCreateContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Daycare",
};

export default function DashboardAdminCreateDaycarePage() {
  return (
    <>
      <DashboardTitle title="Create New Daycare" />
      <DaycareCreateContent />
    </>
  );
}
