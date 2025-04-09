import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { DayCare } from "@/types/daycares/daycare";
import { CubTalkType } from "@/validators/cub/talk/cub-talk-validator";

interface NewQuestionTalkResponse {
  data: DayCare;
}

export const addNewQuestionTalkHandler = async (
  body: CubTalkType,
  token: string
): Promise<NewQuestionTalkResponse> => {
  const { data } = await api.post("/talk", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useAddNewQuestionTalk = (
  options?: UseMutationOptions<
    NewQuestionTalkResponse,
    AxiosError<any>,
    CubTalkType
  >
) => {
  const { data: sessionData } = useSession();
  return useMutation({
    mutationFn: (body: CubTalkType) =>
      addNewQuestionTalkHandler(body, sessionData?.access_token as string),
    ...options,
  });
};
