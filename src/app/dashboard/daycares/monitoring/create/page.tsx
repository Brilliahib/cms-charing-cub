import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardDaycareCreateMonitoring from "@/components/organism/dashboard/daycares/monitoring/DashboardDaycareCreateMonitoring";

export default function DashboardDaycareCreateMonitoringPage() {
  return (
    <section>
      <DashboardTitle
        title="Tambah Monitoring"
        body="Lengkapi form berikut untuk membuat monitoring baru"
      />
      <DashboardDaycareCreateMonitoring />
    </section>
  );
}
