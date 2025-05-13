import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardFeedbackWrapper from "@/components/organism/dashboard/feedbacks/DashboardFeedbackWrapper";

export default function DashboardFeedbacksPage() {
  return (
    <section className="space-y-10">
      <DashboardTitle
        title="Beri Masukan Untuk Kami"
        body="Sampaikan pendapat dan saran Anda demi pelayanan yang lebih baik"
      />
      <DashboardFeedbackWrapper />
    </section>
  );
}
