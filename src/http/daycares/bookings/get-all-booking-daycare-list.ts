import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { api } from "@/lib/axios";
import { BookingDaycare } from "@/types/booking/booking";

interface GetAllBookingDaycareListResponse {
  data: BookingDaycare[];
}

export const getAllBookingDaycareListHandler = async (
  token: string
): Promise<GetAllBookingDaycareListResponse> => {
  const { data } = await api.get<GetAllBookingDaycareListResponse>(
    "/daycares/booking/list",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

export const useGetAllBookingDaycareList = (
  token: string,
  options?: Partial<
    UseQueryOptions<GetAllBookingDaycareListResponse, AxiosError>
  >
) => {
  return useQuery({
    queryKey: ["booking-daycares-list"],
    queryFn: () => getAllBookingDaycareListHandler(token),
    ...options,
  });
};
