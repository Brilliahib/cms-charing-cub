import CubCareDetailContent from "@/components/organism/cub/care/CubCareDetailContent";

interface CubCareDetailProps {
  params: { id: string };
}

export default function CubCareDetailPage({ params }: CubCareDetailProps) {
  return (
    <>
      <CubCareDetailContent id={params.id} />
    </>
  );
}
