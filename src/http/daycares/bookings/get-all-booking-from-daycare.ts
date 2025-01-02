import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { api } from "@/lib/axios";
import { BookingDaycare } from "@/types/booking/booking";

interface GetAllBookingFromDaycaresResponse {
  data: BookingDaycare[];
}

export const getAllBookingFromDaycaresHandler = async (
  token: string
): Promise<GetAllBookingFromDaycaresResponse> => {
  const { data } = await api.get<GetAllBookingFromDaycaresResponse>(
    "/users/daycares/booking/list",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

export const useGetAllBookingFromDaycares = (
  token: string,
  options?: Partial<
    UseQueryOptions<GetAllBookingFromDaycaresResponse, AxiosError>
  >
) => {
  return useQuery({
    queryKey: ["booking-from-daycares"],
    queryFn: () => getAllBookingFromDaycaresHandler(token),
    ...options,
  });
};
