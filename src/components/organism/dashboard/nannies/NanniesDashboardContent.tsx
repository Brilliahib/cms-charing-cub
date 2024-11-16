import CardGraphBookingNannies from "@/components/molecules/card/CardGraphBookingNannies";
import CardSummaryBookingNannies from "@/components/molecules/card/CardSummaryBookingNannies";

export default function NanniesDashboard() {
  return (
    <div className="md:space-y-8 space-y-6 py-8">
      <CardSummaryBookingNannies />
      <CardGraphBookingNannies />
    </div>
  );
}
