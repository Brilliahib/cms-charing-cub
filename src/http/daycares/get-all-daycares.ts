import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { api } from "@/lib/axios";
import { DayCare } from "@/types/daycares/daycare";

interface GetAllDaycareResponse {
  data: DayCare[];
}

export const getAllDaycareHandler = async (params?: {
  location?: string;
}): Promise<GetAllDaycareResponse> => {
  const { data } = await api.get<GetAllDaycareResponse>("/daycares", {
    params,
  });

  if (!data || !Array.isArray(data.data)) {
    return { data: [] };
  }

  return data;
};

export const useGetAllDaycare = (
  params?: {
    location?: string;
    latitude?: number | null;
    longitude?: number | null;
  },
  options?: Partial<UseQueryOptions<GetAllDaycareResponse, AxiosError>>
) => {
  return useQuery({
    queryKey: ["daycare-list", params],
    queryFn: () => getAllDaycareHandler(params),
    ...options,
  });
};
