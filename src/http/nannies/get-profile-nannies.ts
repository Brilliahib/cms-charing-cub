import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { api } from "@/lib/axios";
import { Nannies } from "@/types/cub/cub";

interface GetProfileNanniesResponse {
  data: Nannies;
}

export const getProfileNanniesHandler = async (
  token: string
): Promise<GetProfileNanniesResponse> => {
  const { data } = await api.get<GetProfileNanniesResponse>(
    "/nannies/profile",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

export const useGetProfileNannies = (
  token: string,
  options?: Partial<UseQueryOptions<GetProfileNanniesResponse, AxiosError>>
) => {
  return useQuery({
    queryKey: ["nannies-profile"],
    queryFn: () => getProfileNanniesHandler(token),
    ...options,
  });
};
