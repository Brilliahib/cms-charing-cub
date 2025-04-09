import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { api } from "@/lib/axios";
import { QuestionTalk } from "@/types/talk/question-talk";

interface GetDetailTalkResponse {
  data: QuestionTalk;
}

export const GetDetailTalkHandler = async (
  id: string
): Promise<GetDetailTalkResponse> => {
  const { data } = await api.get<GetDetailTalkResponse>(`/talk/${id}`);

  return data;
};

export const useGetDetailTalk = (
  id: string,
  options?: Partial<UseQueryOptions<GetDetailTalkResponse, AxiosError>>
) => {
  return useQuery({
    queryKey: ["question-talk-detail", id],
    queryFn: () => GetDetailTalkHandler(id),
    ...options,
  });
};
