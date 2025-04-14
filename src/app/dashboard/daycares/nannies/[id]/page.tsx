import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DaycareNanniesDetailWrapper from "@/components/organism/dashboard/daycares/DaycareNanniesDetailWrapper";

interface DaycareNanniesDetailProps {
  params: Promise<{ id: string }>;
}

export default async function DaycareNanniesDetailPage({
  params,
}: DaycareNanniesDetailProps) {
  const { id } = await params;
  return (
    <section>
      <DashboardTitle title="Detail Nannies" />
      <DaycareNanniesDetailWrapper id={id} />
    </section>
  );
}
