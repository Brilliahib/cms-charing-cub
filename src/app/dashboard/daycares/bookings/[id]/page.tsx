import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DaycareBookingDetailContent from "@/components/organism/dashboard/daycares/DaycareBookingDetailContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Detail Booking Daycare",
};

interface DashboardDaycareBookingDetailProps {
  params: { id: string };
}

export default function DashboardDaycareBookingDetailPage({
  params,
}: DashboardDaycareBookingDetailProps) {
  return (
    <>
      <DashboardTitle title="Detail Booking" />
      <DaycareBookingDetailContent id={params.id} />
    </>
  );
}
