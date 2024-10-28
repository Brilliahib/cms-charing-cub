import DaycareDetailDashboardContent from "@/components/organism/dashboard/daycares/DaycareDetailDashboardContent";

interface DaycareDetailProps {
  params: { id: number };
}

export default function DashboardDaycareDetailPage({
  params,
}: DaycareDetailProps) {
  return (
    <>
      <DaycareDetailDashboardContent id={params.id} />
    </>
  );
}
