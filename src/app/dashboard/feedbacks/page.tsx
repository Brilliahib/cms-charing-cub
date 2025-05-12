import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardFeedbackWrapper from "@/components/organism/dashboard/feedbacks/DashboardFeedbackWrapper";

export default function DashboardFeedbacksPage() {
  return (
    <section className="space-y-10">
      <DashboardTitle title="Beri Masukan Kepada Kami" />
      <DashboardFeedbackWrapper />
    </section>
  );
}
