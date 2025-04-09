import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { CubTalkType } from "@/validators/cub/talk/cub-talk-validator";
import { QuestionTalk } from "@/types/talk/question-talk";
import { QuestionAnswerType } from "@/validators/cub/talk/cub-talk-answer-validator";

interface QuestionAnswerResponse {
  data: QuestionTalk;
}

export const addQuestionAnswerHandler = async (
  body: QuestionAnswerType,
  token: string
): Promise<QuestionAnswerResponse> => {
  const { data } = await api.post("/talk/answer/question", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useAddQuestionAnswer = (
  options?: UseMutationOptions<
    QuestionAnswerResponse,
    AxiosError<any>,
    QuestionAnswerType
  >
) => {
  const { data: sessionData } = useSession();
  return useMutation({
    mutationFn: (body: QuestionAnswerType) =>
      addQuestionAnswerHandler(body, sessionData?.access_token as string),
    ...options,
  });
};
