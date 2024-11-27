import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { api } from "@/lib/axios";
import { Auth } from "@/types/auth/auth";

interface GetDetailUserParams {
  token: string;
  id: number;
}

interface GetDetailUserResponse {
  data: Auth;
}

export const getDetailUserHandler = async ({
  token,
  id,
}: GetDetailUserParams): Promise<GetDetailUserResponse> => {
  const { data } = await api.get<GetDetailUserResponse>(`/user/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useGetDetailUser = (
  { token, id }: GetDetailUserParams,
  options?: Partial<UseQueryOptions<GetDetailUserResponse, AxiosError>>
) => {
  return useQuery({
    queryKey: ["users-detail"],
    queryFn: () => getDetailUserHandler({ token, id }),
    ...options,
  });
};
