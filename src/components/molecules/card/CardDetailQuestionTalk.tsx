import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { QuestionTalk } from "@/types/talk/question-talk";
import { buildFromAppURL, generateFallbackFromName } from "@/utils/misc";
import { formatRelativeTime } from "@/utils/time-post";
import SkeletonCardDetailQuestionTalkSkeleton from "../skeleton/SkeletonCardDetailQuestionTalk";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useState } from "react";
import FormQuestionAnswer from "../form/FormQuestionAnswer";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

interface CardDetailQuestionTalkProps {
  data: QuestionTalk;
  isLoading?: boolean;
}

export default function CardDetailQuestionTalk({
  data,
  isLoading,
}: CardDetailQuestionTalkProps) {
  const [isAnswering, setIsAnswering] = useState(false);
  const { data: session } = useSession();
  const user = session?.user;
  const isAuthenticated = !!user;
  const isPsychiatrist = user?.role === "psychiatrist";

  if (isLoading) {
    return <SkeletonCardDetailQuestionTalkSkeleton />;
  }

  const handleAnswerClick = () => {
    if (!isAuthenticated) {
      toast.error("Anda harus login untuk memberi jawaban!");
      return;
    }
    setIsAnswering(true);
  };

  return (
    <div className="space-y-8 md:space-y-12">
      <Card className="border shadow-none">
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
                <div className="text-sm text-muted-foreground">
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

      {isAnswering && (
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="font-bold text-xl">Beri Jawaban</h1>
            <p className="text-muted-foreground">
              Gunakan bahasa yang sopan dan baik
            </p>
          </div>
          <FormQuestionAnswer id={data.id} />
        </div>
      )}
      <div className="md:space-y-8 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-xl">Jawaban</h1>
          {!isAnswering ? (
            <Button
              onClick={handleAnswerClick}
              disabled={isAuthenticated && !isPsychiatrist}
            >
              Beri Jawaban
            </Button>
          ) : (
            <Button variant="destructive" onClick={() => setIsAnswering(false)}>
              <X className="mr-2" /> Batal
            </Button>
          )}
        </div>
        {data.talk_answers.map((answer) => (
          <Card key={answer.id} className="border shadow-none">
            <CardHeader>
              <div className="flex justify-between">
                <div className="flex gap-4 items-center">
                  <Avatar className="h-12 w-12 border border-muted">
                    <AvatarImage src={buildFromAppURL(answer.user.profile)} />
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
              <div
                dangerouslySetInnerHTML={{ __html: answer.answer ?? "" }}
                className="prose text-justify"
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
