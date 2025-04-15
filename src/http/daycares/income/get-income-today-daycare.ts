import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { IncomeToday } from "@/types/daycares/income/income-summary";

interface GetIncomeTodayDaycareResponse {
  data: IncomeToday;
}

export const GetIncomeTodayDaycareHandler = async (
  token: string
): Promise<GetIncomeTodayDaycareResponse> => {
  const { data } = await api.get<GetIncomeTodayDaycareResponse>(
    `/daycares/income-today`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

export const useGetIncomeTodayDaycare = (
  token: string,
  options?: Partial<UseQueryOptions<GetIncomeTodayDaycareResponse, AxiosError>>
) => {
  return useQuery({
    queryKey: ["income-today-daycare"],
    queryFn: () => GetIncomeTodayDaycareHandler(token),
    ...options,
  });
};
