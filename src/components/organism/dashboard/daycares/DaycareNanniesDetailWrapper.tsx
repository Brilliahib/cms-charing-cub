"use client";

import CardDaycareNanniesDetail from "@/components/molecules/card/CardDaycareNanniesDetail";
import { useGetDetailNannies } from "@/http/nannies/get-detail-nannies";

interface DaycareNanniesDetailProps {
  id: string;
}

export default function DaycareNanniesDetailWrapper({
  id,
}: DaycareNanniesDetailProps) {
  const { data } = useGetDetailNannies({ id });
  return (
    <div className="py-8">
      <CardDaycareNanniesDetail data={data?.data} />
    </div>
  );
}
