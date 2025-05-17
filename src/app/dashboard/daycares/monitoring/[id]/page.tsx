import DashboardDetailDaycareMonitoringWrapper from "@/components/organism/dashboard/daycares/monitoring/DashboardDetailDaycareMonitoring";

interface DashboardDaycareDetailMonitoringPageProps {
  params: { id: string };
}

export default function DashboardDaycareDetailMonitoringPage({
  params,
}: DashboardDaycareDetailMonitoringPageProps) {
  return (
    <section>
      <DashboardDetailDaycareMonitoringWrapper id={params.id} />
    </section>
  );
}
