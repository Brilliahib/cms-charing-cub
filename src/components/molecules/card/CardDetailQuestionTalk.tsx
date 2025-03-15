import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { QuestionTalk } from "@/types/talk/question-talk";
import { buildFromAppURL, generateFallbackFromName } from "@/utils/misc";
import { formatRelativeTime } from "@/utils/time-post";
import SkeletonCardDetailQuestionTalkSkeleton from "../skeleton/SkeletonCardDetailQuestionTalk";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface CardDetailQuestionTalkProps {
  data: QuestionTalk;
  isLoading?: boolean;
}

export default function CardDetailQuestionTalk({
  data,
  isLoading,
}: CardDetailQuestionTalkProps) {
  if (isLoading) {
    return <SkeletonCardDetailQuestionTalkSkeleton />;
  }
  return (
    <div className="space-y-8 md:space-y-12">
      <Card className="border shadow">
        <CardHeader>
          <div className="flex justify-between">
            <div className="flex gap-4 items-center">
              <Avatar className="h-12 w-12 border border-muted">
                <AvatarImage src={buildFromAppURL(data?.user.profile)} />
                <AvatarFallback className="h-12 w-12 font-semibold bg-[#EED584] text-white">
                  {generateFallbackFromName(data?.user.name ?? "")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="font-semibold">{data.user.name}</h1>
                <div className="text-sm text-muted-foreground capitalize">
                  {formatRelativeTime(data.created_at)}
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div>
            <p className="leading-relaxed">{data.question_detail}</p>
          </div>
        </CardContent>
      </Card>
      <div className="md:space-y-8 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-xl">Jawaban</h1>
          <Button>
            <Plus />
            Beri Jawaban
          </Button>
        </div>
        {data.talk_answers.map((answer) => (
          <Card key={answer.id} className="border shadow">
            <CardHeader>
              <div className="flex justify-between">
                <div className="flex gap-4 items-center">
                  <Avatar className="h-12 w-12 border border-muted">
                    <AvatarImage src={answer.user.profile} />
                    <AvatarFallback className="h-12 w-12 font-semibold bg-[#EED584] text-white">
                      {generateFallbackFromName(answer.user.name ?? "")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h1 className="font-semibold">{answer.user.name}</h1>
                    <div className="text-sm text-muted-foreground capitalize">
                      {formatRelativeTime(answer.created_at)}
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div>{answer.answer}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
