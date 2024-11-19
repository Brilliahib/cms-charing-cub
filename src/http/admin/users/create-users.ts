import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { CreateUserType } from "@/validators/users/create-user-validator";
import { Auth } from "@/types/auth/auth";

interface CreateUserResponse {
  data: Auth;
}

export const addCreateUserHandler = async (
  body: CreateUserType,
  token: string
): Promise<CreateUserResponse> => {
  const { data } = await api.post("/user", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useAddCreateUser = (
  options?: UseMutationOptions<
    CreateUserResponse,
    AxiosError<any>,
    CreateUserType
  >
) => {
  const { data: sessionData } = useSession();
  return useMutation({
    mutationFn: (body: CreateUserType) =>
      addCreateUserHandler(body, sessionData?.access_token as string),
    ...options,
  });
};
