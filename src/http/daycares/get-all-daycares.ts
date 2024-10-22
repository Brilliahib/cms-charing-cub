import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { api } from "@/lib/axios";
import { DayCare } from "@/types/daycares/daycare";

interface GetAllDaycareResponse {
  data: DayCare[];
}

export const getAllDaycareHandler =
  async (): Promise<GetAllDaycareResponse> => {
    const { data } = await api.get<GetAllDaycareResponse>("/daycares");

    return data;
  };

export const useGetAllDaycare = (
  options?: Partial<UseQueryOptions<GetAllDaycareResponse, AxiosError>>
) => {
  return useQuery({
    queryKey: ["daycare-list"],
    queryFn: getAllDaycareHandler,
    ...options,
  });
};
