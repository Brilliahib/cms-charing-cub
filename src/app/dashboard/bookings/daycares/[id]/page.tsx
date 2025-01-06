import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import CubLocationDetailContent from "@/components/organism/cub/location/CubLocationDetailContent";
import DaycareBookingDetailContent from "@/components/organism/dashboard/daycares/DaycareBookingDetailContent";

interface DaycareBookingDetailProps {
  params: { id: string };
}

export default function DashboardDaycareBookingDetailPage({
  params,
}: DaycareBookingDetailProps) {
  return (
    <>
      <DashboardTitle title="Detail Booking" />
      <DaycareBookingDetailContent id={params.id} />
    </>
  );
}
