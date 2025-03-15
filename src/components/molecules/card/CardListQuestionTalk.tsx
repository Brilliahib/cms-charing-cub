import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { QuestionTalk } from "@/types/talk/question-talk";
import { buildFromAppURL, generateFallbackFromName } from "@/utils/misc";
import { formatRelativeTime } from "@/utils/time-post";
import Link from "next/link";

interface CardListQuestionTalkProps {
  data: QuestionTalk;
}

export default function CardListQuestionTalk({
  data,
}: CardListQuestionTalkProps) {
  return (
    <Link href={`/cub-talk/${data.id}`}>
      <Card className="border">
        <CardHeader>
          <div className="flex md:gap-4 gap-2">
            <div>
              <Avatar className="h-12 w-12 border border-muted">
                <AvatarImage src={buildFromAppURL(data?.user.profile)} />
                <AvatarFallback className="h-12 w-12 font-semibold bg-[#EED584] text-white">
                  {generateFallbackFromName(data?.user.name ?? "")}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="space-y-1">
              <h1 className="font-semibold line-clamp-1">
                {data.question_title}
              </h1>
              {/* <p className="text-sm">{data.user.name}</p> */}
              <div className="text-sm text-muted-foreground capitalize">
                {formatRelativeTime(data.created_at)}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="line-clamp-2 md:text-base text-sm">
            {data.question_detail}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
