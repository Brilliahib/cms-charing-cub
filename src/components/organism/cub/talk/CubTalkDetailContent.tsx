"use client";

import PageContainer from "@/components/atoms/container/PageContainer";
import CardDetailQuestionTalk from "@/components/molecules/card/CardDetailQuestionTalk";
import { useGetDetailTalk } from "@/http/cub/talk/get-detail-question-talk";

interface CubTalkDetailContentProps {
  id: string;
}

export default function CubTalkDetailContent({
  id,
}: CubTalkDetailContentProps) {
  const { data, isPending } = useGetDetailTalk(id);

  return (
    <PageContainer>
      <CardDetailQuestionTalk data={data?.data!} isLoading={isPending} />
    </PageContainer>
  );
}
