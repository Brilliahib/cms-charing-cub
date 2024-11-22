import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { Auth } from "@/types/auth/auth";
import { UpdateAccountType } from "@/validators/auth/update-account-validator";

interface UpdateAccountResponse {
  data: Auth;
}

export const addUpdateAccountHandler = async (
  body: UpdateAccountType,
  token: string
): Promise<UpdateAccountResponse> => {
  const formData = new FormData();

  formData.append("name", body.name);
  formData.append("email", body.email);

  if (body.profile) {
    formData.append("profile", body.profile);
  }

  const { data } = await api.post("/auth/update-account", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

export const useAddUpdateAccount = (
  options?: UseMutationOptions<
    UpdateAccountResponse,
    AxiosError<any>,
    UpdateAccountType
  >
) => {
  const { data: sessionData } = useSession();
  return useMutation({
    mutationFn: (body: UpdateAccountType) =>
      addUpdateAccountHandler(body, sessionData?.access_token as string),
    ...options,
  });
};
