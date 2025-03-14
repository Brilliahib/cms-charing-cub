"use client";

import PageContainer from "@/components/atoms/container/PageContainer";
import SectionTitle from "@/components/atoms/typography/SectionTitle";
import CardListQuestionTalk from "@/components/molecules/card/CardListQuestionTalk";
import { Button } from "@/components/ui/button";
import { useGetAllQuestionTalk } from "@/http/cub/talk/get-all-question-talk";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function CubTalkContent() {
  const { data } = useGetAllQuestionTalk();
  return (
    <>
      <div className="pad-x-xl mt-8">
        <div className="mb-8 flex justify-between">
          <SectionTitle
            title="Cub Talk"
            subtitle="Ask the Experts About Parenting & Childcare"
          />
          <Button asChild>
            <Link href="/cub-talk/create">
              <Plus className="mr-2" /> Mulai Bertanya
            </Link>
          </Button>
        </div>
      </div>
      <PageContainer>
        <div className="flex flex-col space-y-4 md:space-y-6">
          {data?.data.map((question) => (
            <CardListQuestionTalk key={question.id} data={question} />
          ))}
        </div>
      </PageContainer>
    </>
  );
}
