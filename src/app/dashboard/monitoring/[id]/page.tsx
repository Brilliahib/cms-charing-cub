import DashboardDetailMonitoringChildrenWrapper from "@/components/organism/dashboard/monitoring/DashboardDetailMonitoringChildren";

interface DashboardMonitoringChildrenDetailPageProps {
  params: { id: string };
}

export default function DashboardMonitoringChildrenDetailPage({
  params,
}: DashboardMonitoringChildrenDetailPageProps) {
  return (
    <section>
      <DashboardDetailMonitoringChildrenWrapper id={params.id} />
    </section>
  );
}
