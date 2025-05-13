import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { Feedback } from "@/types/feedbacks/feedbacks";

interface GetAllFeedbackResponse {
  data: Feedback[];
}

export const GetAllFeedbackHandler = async (
  token: string
): Promise<GetAllFeedbackResponse> => {
  const { data } = await api.get<GetAllFeedbackResponse>("/feedback", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useGetAllFeedback = (
  token: string,
  options?: Partial<UseQueryOptions<GetAllFeedbackResponse, AxiosError>>
) => {
  return useQuery({
    queryKey: ["feedback-list"],
    queryFn: () => GetAllFeedbackHandler(token),
    ...options,
  });
};
