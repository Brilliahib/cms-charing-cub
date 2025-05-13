import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DaycareAdminContent from "@/components/organism/dashboard/admin/daycares/DaycareAdminContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Daycares",
};

export default function DashboardAdminDaycarePage() {
  return (
    <>
      <DashboardTitle
        title="Daycares"
        body="Menampilkan daftar daycare yang tersedia"
      />
      <DaycareAdminContent />
    </>
  );
}
