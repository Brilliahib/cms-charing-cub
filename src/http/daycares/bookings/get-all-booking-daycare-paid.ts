import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { BookingDaycare } from "@/types/booking/booking";
import { Pagination } from "@/types/pagination/pagination";

interface GetAllBokingDaycareIsPaidResponse {
  data: BookingDaycare[];
  pagination: Pagination;
}

export const GetAllBokingDaycareIsPaidHandler = async (
  token: string,
  query: string,
  currentPage: number
): Promise<GetAllBokingDaycareIsPaidResponse> => {
  const params: Record<string, string | undefined> = {
    name: query,
    page: currentPage.toString(),
  };
  const { data } = await api.get<GetAllBokingDaycareIsPaidResponse>(
    "/daycares/booking/paid",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params,
    }
  );

  return data;
};

export const useGetAllBokingDaycareIsPaid = (
  token: string,
  query: string,
  currentPage: number,
  options?: Partial<
    UseQueryOptions<GetAllBokingDaycareIsPaidResponse, AxiosError>
  >
) => {
  return useQuery({
    queryKey: ["booking-paid-daycares", query, currentPage],
    queryFn: () => GetAllBokingDaycareIsPaidHandler(token, query, currentPage),
    ...options,
  });
};
