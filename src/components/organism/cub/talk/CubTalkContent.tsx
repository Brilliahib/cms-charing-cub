"use client";

import PageContainer from "@/components/atoms/container/PageContainer";
import SectionTitle from "@/components/atoms/typography/SectionTitle";
import CardListQuestionTalk from "@/components/molecules/card/CardListQuestionTalk";
import { Button } from "@/components/ui/button";
import { useGetAllQuestionTalk } from "@/http/cub/talk/get-all-question-talk";
import { Plus } from "lucide-react";

export default function CubTalkContent() {
  const { data } = useGetAllQuestionTalk();
  return (
    <PageContainer>
      <div className="mb-8 flex justify-between">
        <SectionTitle
          title="Cub Talk"
          subtitle="Ask the Experts About Parenting & Childcare"
        />
        <Button>
          <Plus /> Mulai Bertanya
        </Button>
      </div>

      <div className="flex flex-col space-y-4 md:space-y-6">
        {data?.data.map((question) => (
          <CardListQuestionTalk key={question.id} data={question} />
        ))}
      </div>
    </PageContainer>
  );
}
