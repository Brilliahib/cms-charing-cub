import CubCareBookingContent from "@/components/organism/cub/care/CubCareBookingContent";

interface CubCareBookingParams {
  params: { id: number };
}

export default function CubCareBookingPage({ params }: CubCareBookingParams) {
  return (
    <>
      <CubCareBookingContent />
    </>
  );
}
