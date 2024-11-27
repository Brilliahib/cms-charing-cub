import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { api } from "@/lib/axios";
import { DayCare } from "@/types/daycares/daycare";

interface GetProfileDaycareResponse {
  data: DayCare;
}

export const GetProfileDaycareHandler = async (
  token: string
): Promise<GetProfileDaycareResponse> => {
  const { data } = await api.get<GetProfileDaycareResponse>(
    "/daycares/profile",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

export const useGetProfileDaycare = (
  token: string,
  options?: Partial<UseQueryOptions<GetProfileDaycareResponse, AxiosError>>
) => {
  return useQuery({
    queryKey: ["daycare-profile"],
    queryFn: () => GetProfileDaycareHandler(token),
    ...options,
  });
};
