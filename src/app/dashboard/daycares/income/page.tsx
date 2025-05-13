import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DaycareIncomeSummary from "@/components/organism/dashboard/daycares/DaycareIncomeSummary";

export default function DashboardDaycareIncomePage() {
  return (
    <section>
      <DashboardTitle
        title="Analisa Pendapatan"
        body="Menampilkan pendapatan Anda setiap harinya"
      />
      <DaycareIncomeSummary />
    </section>
  );
}
