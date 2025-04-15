import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { IncomeTotal } from "@/types/daycares/income/income-summary";

interface GetIncomeSummaryTotalDaycareResponse {
  data: IncomeTotal;
}

export const GetIncomeSummaryTotalDaycareHandler = async (
  token: string
): Promise<GetIncomeSummaryTotalDaycareResponse> => {
  const { data } = await api.get<GetIncomeSummaryTotalDaycareResponse>(
    `/daycares/income-total`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

export const useGetIncomeSummaryTotalDaycare = (
  token: string,
  options?: Partial<
    UseQueryOptions<GetIncomeSummaryTotalDaycareResponse, AxiosError>
  >
) => {
  return useQuery({
    queryKey: ["income-total-daycare"],
    queryFn: () => GetIncomeSummaryTotalDaycareHandler(token),
    ...options,
  });
};
