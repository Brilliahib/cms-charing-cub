import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { api } from "@/lib/axios";
import { DayCare } from "@/types/daycares/daycare";

interface GetAllDaycareDisabilityResponse {
  data: DayCare[];
}

export const getAllDaycareDisabilityHandler =
  async (): Promise<GetAllDaycareDisabilityResponse> => {
    const { data } = await api.get<GetAllDaycareDisabilityResponse>(
      "/daycares/disability"
    );

    if (!data || !Array.isArray(data.data)) {
      return { data: [] };
    }

    return data;
  };

export const useGetAllDaycareDisability = (
  options?: Partial<
    UseQueryOptions<GetAllDaycareDisabilityResponse, AxiosError>
  >
) => {
  return useQuery({
    queryKey: ["daycare-disability"],
    queryFn: getAllDaycareDisabilityHandler,
    ...options,
  });
};
