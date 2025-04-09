import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useGetAllQuestionTalk } from "@/http/cub/talk/get-all-question-talk";
import { buildFromAppURL, generateFallbackFromName } from "@/utils/misc";
import { formatRelativeTime } from "@/utils/time-post";
import Link from "next/link";

export default function CardOtherQuestionTalk() {
  const { data } = useGetAllQuestionTalk();
  return (
    <div className="space-y-8">
      <h1 className="font-bold text-xl">Diskusi Terkait</h1>
      <div className="space-y-8">
        {data?.data.map((question) => (
          <div key={question.id}>
            <Link href={`/cub-talk/${question.id}`}>
              <Card className="border-b rounded-none space-y-4">
                <CardHeader className="p-0">
                  <div className="flex md:gap-4 gap-2">
                    <div>
                      <Avatar className="h-12 w-12 border border-muted">
                        <AvatarImage src={question?.user.profile} />
                        <AvatarFallback className="h-12 w-12 font-semibold bg-[#EED584] text-white">
                          {generateFallbackFromName(question?.user.name ?? "")}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="space-y-1">
                      <h1 className="font-semibold line-clamp-1">
                        {question.question_title}
                      </h1>
                      <p className="text-sm">{question.user.name}</p>
                      <div className="text-sm text-muted-foreground capitalize">
                        {formatRelativeTime(question.created_at)}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0 pb-6">
                  <p className="line-clamp-2 md:text-base text-sm">
                    {question.question_detail}
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
