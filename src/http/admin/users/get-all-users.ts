import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { api } from "@/lib/axios";
import { Auth } from "@/types/auth/auth";

interface GetAllUsersResponse {
  data: Auth[];
}

export const getAllUsersHandler = async (
  token: string
): Promise<GetAllUsersResponse> => {
  const { data } = await api.get<GetAllUsersResponse>("/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useGetAllUsers = (
  token: string,
  options?: Partial<UseQueryOptions<GetAllUsersResponse, AxiosError>>
) => {
  return useQuery({
    queryKey: ["users-list"],
    queryFn: () => getAllUsersHandler(token),
    ...options,
  });
};
