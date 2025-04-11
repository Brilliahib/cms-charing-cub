"use client";

import SectionTitle from "@/components/atoms/typography/SectionTitle";
import CardListQuestionTalk from "@/components/molecules/card/CardListQuestionTalk";
import { Button } from "@/components/ui/button";
import { useGetAllQuestionTalk } from "@/http/cub/talk/get-all-question-talk";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function CubTalkContent() {
  const { data } = useGetAllQuestionTalk();
  const session = useSession();
  const router = useRouter();

  const handleCreateClick = () => {
    if (!session.data?.access_token) {
      toast.error("Belum Login", {
        description: "Silahkan login terlebih dahulu sebelum mulai bertanya!",
      });
    } else {
      router.push(`/cub-talk/create`);
    }
  };
  return (
    <>
      <div className="pad-x-xl mt-8">
        <div className="mb-8 flex justify-between">
          <SectionTitle
            title="Cub Talk"
            subtitle="Ask the Experts About Parenting & Childcare"
          />
          <Button onClick={handleCreateClick}>Mulai Bertanya</Button>
        </div>
        <div className="flex flex-col space-y-4 md:space-y-6">
          {data?.data.map((question) => (
            <CardListQuestionTalk key={question.id} data={question} />
          ))}
        </div>
      </div>
    </>
  );
}
