"use client";

import PageContainer from "@/components/atoms/container/PageContainer";
import SectionTitle from "@/components/atoms/typography/SectionTitle";
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
    <>
      <div className="pad-x-xl mt-8">
        <div className="mb-8 flex justify-between">
          <SectionTitle
            title="Detail Pertanyaan"
            subtitle="Ask the Experts About Parenting & Childcare"
          />
        </div>
        <CardDetailQuestionTalk data={data?.data!} isLoading={isPending} />
      </div>
    </>
  );
}
