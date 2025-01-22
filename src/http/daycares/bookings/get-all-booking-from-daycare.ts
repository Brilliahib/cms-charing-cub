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
  query: string
): Promise<GetAllBookingFromDaycaresResponse> => {
  const params: Record<string, string | undefined> = {
    name: query,
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
  options?: Partial<
    UseQueryOptions<GetAllBookingFromDaycaresResponse, AxiosError>
  >
) => {
  return useQuery({
    queryKey: ["booking-from-daycares", query],
    queryFn: () => getAllBookingFromDaycaresHandler(token, query),
    ...options,
  });
};
