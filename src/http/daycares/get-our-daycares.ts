import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { DayCare } from "@/types/daycares/daycare";

interface GetOurDaycareResponse {
  data: DayCare;
}

export const GetOurDaycareHandler = async (
  token: string
): Promise<GetOurDaycareResponse> => {
  const { data } = await api.get<GetOurDaycareResponse>("/daycares/my", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useGetOurDaycare = (
  token: string,
  options?: Partial<UseQueryOptions<GetOurDaycareResponse, AxiosError>>
) => {
  return useQuery({
    queryKey: ["our-daycare"],
    queryFn: () => GetOurDaycareHandler(token),
    ...options,
  });
};
