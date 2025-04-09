import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { api } from "@/lib/axios";
import { QuestionTalk } from "@/types/talk/question-talk";

interface GetAllQuestionTalkResponse {
  data: QuestionTalk[];
}

export const GetAllQuestionTalkHandler =
  async (): Promise<GetAllQuestionTalkResponse> => {
    const { data } = await api.get<GetAllQuestionTalkResponse>("/talk");

    return data;
  };

export const useGetAllQuestionTalk = (
  options?: Partial<UseQueryOptions<GetAllQuestionTalkResponse, AxiosError>>
) => {
  return useQuery({
    queryKey: ["question-talk-list"],
    queryFn: GetAllQuestionTalkHandler,
    ...options,
  });
};
