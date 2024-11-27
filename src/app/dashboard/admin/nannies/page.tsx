import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import NanniesAdminContent from "@/components/organism/dashboard/admin/nannies/NanniesAdminContent";

export default function DashboardAdminNanniesPage() {
  return (
    <>
      <DashboardTitle title="Nannies" />
      <NanniesAdminContent />
    </>
  );
}
