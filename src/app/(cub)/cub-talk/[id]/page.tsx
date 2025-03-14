import CubTalkDetailContent from "@/components/organism/cub/talk/CubTalkDetailContent";

interface CubTalkDetailPageProps {
  params: { id: string };
}

export default function CubTalkDetailPage({ params }: CubTalkDetailPageProps) {
  return <CubTalkDetailContent id={params.id} />;
}
