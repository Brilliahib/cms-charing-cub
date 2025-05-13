import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardMonitoringDaycaresWrapper from "@/components/organism/dashboard/monitoring/DashboardMonitoringDaycares";

export default function DashboardMonitoringPage() {
  return (
    <>
      <DashboardTitle
        title="Monitoring Anak"
        body="Pantau aktivitas harian anak Anda selama di daycare"
      />
      <DashboardMonitoringDaycaresWrapper />
    </>
  );
}
