import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { MyDaycare } from "@/types/daycares/daycare";

interface GetMyDaycareResponse {
  data: MyDaycare;
}

export const GetMyDaycareHandler = async (
  token: string
): Promise<GetMyDaycareResponse> => {
  const { data } = await api.get<GetMyDaycareResponse>("/daycares/my", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useGetMyDaycare = (
  token: string,
  options?: Partial<UseQueryOptions<GetMyDaycareResponse, AxiosError>>
) => {
  return useQuery({
    queryKey: ["my-daycare"],
    queryFn: () => GetMyDaycareHandler(token),
    ...options,
  });
};
