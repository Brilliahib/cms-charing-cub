import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { Feedback } from "@/types/feedbacks/feedbacks";
import { FeedbacksType } from "@/validators/feedbacks/feedbacks-validator";

interface NewFeedbackResponse {
  data: Feedback;
}

export const addNewFeedbackHandler = async (
  body: FeedbacksType,
  token: string
): Promise<NewFeedbackResponse> => {
  const { data } = await api.post("/feedback", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useAddNewFeedback = (
  options?: UseMutationOptions<
    NewFeedbackResponse,
    AxiosError<NewFeedbackResponse>,
    FeedbacksType
  >
) => {
  const { data: sessionData } = useSession();
  return useMutation({
    mutationFn: (body: FeedbacksType) =>
      addNewFeedbackHandler(body, sessionData?.access_token as string),
    ...options,
  });
};
