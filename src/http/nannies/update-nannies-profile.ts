import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { Nannies } from "@/types/cub/cub";
import { NanniesType } from "@/validators/nannies/nannies-validator";

interface UpdateNanniesProfileResponse {
  data: Nannies;
}

export const UpdateNanniesProfileHandler = async (
  body: NanniesType,
  token: string
): Promise<UpdateNanniesProfileResponse> => {
  const { data } = await api.put(`/nannies`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useUpdateNanniesProfile = (
  options?: UseMutationOptions<
    UpdateNanniesProfileResponse,
    AxiosError,
    NanniesType
  >
) => {
  const { data: sessionData } = useSession();
  return useMutation({
    mutationFn: (body) =>
      UpdateNanniesProfileHandler(body, sessionData?.access_token as string),
    ...options,
  });
};
