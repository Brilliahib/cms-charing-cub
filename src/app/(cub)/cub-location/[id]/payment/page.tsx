import CubLocationPaymentContent from "@/components/organism/cub/location/CubLocationPaymentContent";

interface CubLocationParams {
  params: { id: string };
}

export default function CubLocationPaymentPage({ params }: CubLocationParams) {
  return (
    <>
      <CubLocationPaymentContent id={params.id} />
    </>
  );
}
