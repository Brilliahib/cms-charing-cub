import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { api } from "@/lib/axios";
import { Nannies } from "@/types/cub/cub";

interface GetAllNanniesResponse {
  data: Nannies[];
}

export const getAllNanniesHandler =
  async (): Promise<GetAllNanniesResponse> => {
    const { data } = await api.get<GetAllNanniesResponse>("/nannies");

    return data;
  };

export const useGetAllNannies = (
  options?: Partial<UseQueryOptions<GetAllNanniesResponse, AxiosError>>
) => {
  return useQuery({
    queryKey: ["nannies-list"],
    queryFn: getAllNanniesHandler,
    ...options,
  });
};
