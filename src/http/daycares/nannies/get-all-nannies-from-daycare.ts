import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { api } from "@/lib/axios";
import { Nannies } from "@/types/cub/cub";

interface GetAllNanniesFromDaycaresResponse {
  data: Nannies[];
}

export const GetAllNanniesFromDaycaresHandler = async (
  token: string
): Promise<GetAllNanniesFromDaycaresResponse> => {
  const { data } = await api.get<GetAllNanniesFromDaycaresResponse>(
    "/daycares/nannies/list",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

export const useGetAllNanniesFromDaycares = (
  token: string,
  options?: Partial<
    UseQueryOptions<GetAllNanniesFromDaycaresResponse, AxiosError>
  >
) => {
  return useQuery({
    queryKey: ["nannies-from-daycares"],
    queryFn: () => GetAllNanniesFromDaycaresHandler(token),
    ...options,
  });
};
