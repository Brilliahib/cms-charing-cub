import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DaycareBookingContent from "@/components/organism/dashboard/daycares/DaycareBookingContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Booking Daycare",
};

export default function DashboardBookingDaycarePage() {
  return (
    <>
      <DashboardTitle title="Booking Daycare" />
      <DaycareBookingContent />
    </>
  );
}
