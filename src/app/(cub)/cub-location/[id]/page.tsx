import CubLocationDetailContent from "@/components/organism/cub/location/CubLocationDetailContent";

interface DaycareDetailProps {
  params: { id: number };
}

export default function DashboardDaycareDetailPage({
  params,
}: DaycareDetailProps) {
  return (
    <>
      <CubLocationDetailContent id={params.id} />
    </>
  );
}
