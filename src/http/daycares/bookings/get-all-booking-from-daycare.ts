import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { api } from "@/lib/axios";
import { BookingDaycare } from "@/types/booking/booking";
import { Pagination } from "@/types/pagination/pagination";

interface GetAllBookingFromDaycaresResponse {
  data: BookingDaycare[];
  pagination: Pagination;
}

export const getAllBookingFromDaycaresHandler = async (
  token: string,
  query: string,
  currentPage: number
): Promise<GetAllBookingFromDaycaresResponse> => {
  const params: Record<string, string | undefined> = {
    name: query,
    page: currentPage.toString(),
  };
  const { data } = await api.get<GetAllBookingFromDaycaresResponse>(
    "/users/daycares/booking/list",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params,
    }
  );

  return data;
};

export const useGetAllBookingFromDaycares = (
  token: string,
  query: string,
  currentPage: number,
  options?: Partial<
    UseQueryOptions<GetAllBookingFromDaycaresResponse, AxiosError>
  >
) => {
  return useQuery({
    queryKey: ["booking-from-daycares", query, currentPage],
    queryFn: () => getAllBookingFromDaycaresHandler(token, query, currentPage),
    ...options,
  });
};
