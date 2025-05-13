import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DaycareNanniesListContent from "@/components/organism/dashboard/daycares/DaycareNanniesListContent";

export default function DashboardDaycareNanniesPage() {
  return (
    <>
      <DashboardTitle
        title="Daftar Nannies"
        body="Menampikan daftar nannies dari daycare Anda"
      />
      <DaycareNanniesListContent />
    </>
  );
}
