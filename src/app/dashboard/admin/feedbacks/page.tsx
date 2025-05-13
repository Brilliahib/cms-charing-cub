import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardAdminFeedbackWrapper from "@/components/organism/dashboard/admin/feedback/DashboardAdminFeedback";

export default function DashboardAdminFeedbacksPage() {
  return (
    <section>
      <DashboardTitle
        title="Daftar Masukan"
        body="Menampilkan daftar masukkan dari pengguna"
      />
      <DashboardAdminFeedbackWrapper />
    </section>
  );
}
