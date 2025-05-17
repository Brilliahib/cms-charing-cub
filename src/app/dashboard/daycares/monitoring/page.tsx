import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardDaycareMonitoringWrapper from "@/components/organism/dashboard/daycares/monitoring/DashboardDaycareMonitoringWrapper";

export default function DashboardDaycareMonitoringPage() {
  return (
    <section>
      <DashboardTitle
        title="Monitoring Anak"
        body="Menampilkan daftar monitoring anak kepada pengguna"
      />
      <DashboardDaycareMonitoringWrapper />
    </section>
  );
}
