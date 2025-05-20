import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { DayCare } from "@/types/daycares/daycare";
import { DaycareType } from "@/validators/daycares/daycare-validator";

interface UpdateDaycareProfileResponse {
  data: DayCare;
}

export const UpdateDaycareProfileHandler = async (
  body: DaycareType,
  token: string
): Promise<UpdateDaycareProfileResponse> => {
  const { data } = await api.put(`/daycares`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useUpdateDaycareProfile = (
  options?: UseMutationOptions<
    UpdateDaycareProfileResponse,
    AxiosError,
    DaycareType
  >
) => {
  const { data: sessionData } = useSession();
  return useMutation({
    mutationFn: (body) =>
      UpdateDaycareProfileHandler(body, sessionData?.access_token as string),
    ...options,
  });
};
