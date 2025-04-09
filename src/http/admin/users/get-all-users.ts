import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { api } from "@/lib/axios";
import { Auth } from "@/types/auth/auth";
import { Pagination } from "@/types/pagination/pagination";

interface GetAllUsersResponse {
  data: Auth[];
  pagination: Pagination;
}

export const getAllUsersHandler = async (
  token: string,
  query: string,
  currentPage: number
): Promise<GetAllUsersResponse> => {
  const params: Record<string, string | undefined> = {
    name: query,
    page: currentPage.toString(),
  };

  const { data } = await api.get<GetAllUsersResponse>("/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params,
  });

  return data;
};

export const useGetAllUsers = (
  token: string,
  query: string,
  currentPage: number,
  options?: Partial<UseQueryOptions<GetAllUsersResponse, AxiosError>>
) => {
  return useQuery({
    queryKey: ["users-list", query, currentPage],
    queryFn: () => getAllUsersHandler(token, query, currentPage),
    ...options,
  });
};
