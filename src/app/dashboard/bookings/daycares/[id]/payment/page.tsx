import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DaycareBookingDetailContent from "@/components/organism/dashboard/daycares/DaycareBookingDetailContent";
import DaycarePaymentContent from "@/components/organism/dashboard/daycares/DaycarePaymentContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment Daycare",
};

interface DaycareDetailPaymentProps {
  params: { id: string };
}

export default function DashboardDaycareDetailPaymentPage({
  params,
}: DaycareDetailPaymentProps) {
  return (
    <>
      <DashboardTitle title="Payment" />
      <DaycarePaymentContent id={params.id} />
    </>
  );
}
