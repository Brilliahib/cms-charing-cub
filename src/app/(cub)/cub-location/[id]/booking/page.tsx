import CubLocationBookingContent from "@/components/organism/cub/location/CubLocationBookingContent";

interface CubLocationParams {
  params: { id: string };
}

export default function CubLocationBookingPage({ params }: CubLocationParams) {
  return (
    <>
      <CubLocationBookingContent id={params.id} />
    </>
  );
}
