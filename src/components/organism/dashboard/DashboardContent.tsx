import CardCountBookingSuccess from "@/components/molecules/card/CardCountBookingSuccess";
import CardCountBookingTotal from "@/components/molecules/card/CardCountBookingTotal";
import CardCountBookingUnsuccess from "@/components/molecules/card/CardCountBookingUnsuccess";

export default function DashboardWrapperContent() {
  return (
    <div className="grid md:grid-cols-3 grid-cols-1 gap-4 md:gap-6 py-4">
      <CardCountBookingTotal />
      <CardCountBookingSuccess />
      <CardCountBookingUnsuccess />
    </div>
  );
}
