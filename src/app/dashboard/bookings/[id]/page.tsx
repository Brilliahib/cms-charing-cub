import BookingDetailDashboardContent from "@/components/organism/dashboard/booking/BookingDetailDashboardContent";

interface DashboardBookingDetailParams {
  params: { id: number };
}

export default function DashboardBookingDetailPage({
  params,
}: DashboardBookingDetailParams) {
  return (
    <>
      <BookingDetailDashboardContent id={params.id} />
    </>
  );
}
