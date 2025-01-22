import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { api } from "@/lib/axios";
import { BookingDaycare } from "@/types/booking/booking";
import { Pagination } from "@/types/pagination/pagination";

interface GetAllBookingDaycareListResponse {
  data: BookingDaycare[];
  pagination: Pagination;
}

export const getAllBookingDaycareListHandler = async (
  token: string,
  query: string
): Promise<GetAllBookingDaycareListResponse> => {
  const params: Record<string, string | undefined> = {
    name: query,
  };
  const { data } = await api.get<GetAllBookingDaycareListResponse>(
    "/daycares/booking/list",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params,
    }
  );

  return data;
};

export const useGetAllBookingDaycareList = (
  token: string,
  query: string,
  options?: Partial<
    UseQueryOptions<GetAllBookingDaycareListResponse, AxiosError>
  >
) => {
  return useQuery({
    queryKey: ["booking-daycares-list", query],
    queryFn: () => getAllBookingDaycareListHandler(token, query),
    ...options,
  });
};
