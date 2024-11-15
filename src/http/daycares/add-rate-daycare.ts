import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { DayCare } from "@/types/daycares/daycare";
import { GiveRateDaycareType } from "@/validators/daycares/give-rate-daycare-validator";

interface GiveRateDaycareResponse {
  data: DayCare;
}

export const addGiveRateDaycareHandler = async (
  body: GiveRateDaycareType,
  token: string
): Promise<GiveRateDaycareResponse> => {
  const { data } = await api.post("/daycares/review", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useAddGiveRateDaycare = (
  options?: UseMutationOptions<
    GiveRateDaycareResponse,
    AxiosError<any>,
    GiveRateDaycareType
  >
) => {
  const { data: sessionData } = useSession();
  return useMutation({
    mutationFn: (body: GiveRateDaycareType) =>
      addGiveRateDaycareHandler(body, sessionData?.access_token as string),
    ...options,
  });
};
