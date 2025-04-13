import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { IncomeSummary } from "@/types/daycares/income/income-summary";

interface GetIncomeSummaryDaycareResponse {
  data: IncomeSummary;
}

export const GetIncomeSummaryDaycareHandler = async (
  token: string,
  range: string
): Promise<GetIncomeSummaryDaycareResponse> => {
  const { data } = await api.get<GetIncomeSummaryDaycareResponse>(
    `/daycares/income-summary?range=${range}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

export const useGetIncomeSummaryDaycare = (
  token: string,
  range: string,
  options?: Partial<
    UseQueryOptions<GetIncomeSummaryDaycareResponse, AxiosError>
  >
) => {
  return useQuery({
    queryKey: ["income-summary-daycare", range],
    queryFn: () => GetIncomeSummaryDaycareHandler(token, range),
    ...options,
  });
};
