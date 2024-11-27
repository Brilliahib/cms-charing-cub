import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import NanniesCreateContent from "@/components/organism/dashboard/admin/nannies/NanniesAdminCreateContent";

export default function DashboardAdminNanniesCreatePage() {
  return (
    <>
      <DashboardTitle title="Create New Nanny" />
      <NanniesCreateContent />
    </>
  );
}
