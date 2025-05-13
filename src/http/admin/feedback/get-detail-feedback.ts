import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { Feedback } from "@/types/feedbacks/feedbacks";

interface GetDetailFeedbackResponse {
  data: Feedback;
}

export const GetDetailFeedbackHandler = async (
  id: string,
  token: string
): Promise<GetDetailFeedbackResponse> => {
  const { data } = await api.get<GetDetailFeedbackResponse>(`/feedback/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useGetDetailFeedback = (
  id: string,
  token: string,
  options?: Partial<UseQueryOptions<GetDetailFeedbackResponse, AxiosError>>
) => {
  return useQuery({
    queryKey: ["feedback-detail", id],
    queryFn: () => GetDetailFeedbackHandler(id, token),
    ...options,
  });
};
