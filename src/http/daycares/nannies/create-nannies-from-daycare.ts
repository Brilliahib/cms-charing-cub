import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { CreateNanniesFromDaycareType } from "@/validators/daycares/create-nannies-from-daycare-validator";
import { Nannies } from "@/types/cub/cub";

interface CreateNanniesFromDaycareResponse {
  data: Nannies;
}

export const addCreateNanniesFromDaycareHandler = async (
  body: CreateNanniesFromDaycareType,
  token: string
): Promise<CreateNanniesFromDaycareResponse> => {
  const { data } = await api.post("/user/nannies", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useAddCreateNanniesFromDaycare = (
  options?: UseMutationOptions<
    CreateNanniesFromDaycareResponse,
    AxiosError<any>,
    CreateNanniesFromDaycareType
  >
) => {
  const { data: sessionData } = useSession();
  return useMutation({
    mutationFn: (body: CreateNanniesFromDaycareType) =>
      addCreateNanniesFromDaycareHandler(
        body,
        sessionData?.access_token as string
      ),
    ...options,
  });
};
