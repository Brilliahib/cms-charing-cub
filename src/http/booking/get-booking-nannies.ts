import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { api } from "@/lib/axios";
import { BookingNannies } from "@/types/booking/booking";

interface GetBookingUserNanniesResponse {
  data: BookingNannies[];
}

export const getBookingUserNanniesHandler = async (
  token: string
): Promise<GetBookingUserNanniesResponse> => {
  const { data } = await api.get<GetBookingUserNanniesResponse>(
    "/users/nannies/booking/list",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

export const useGetBookingUserNannies = (
  token: string,
  options?: Partial<UseQueryOptions<GetBookingUserNanniesResponse, AxiosError>>
) => {
  return useQuery({
    queryKey: ["booking-nannies-list"],
    queryFn: () => getBookingUserNanniesHandler(token),
    ...options,
  });
};
