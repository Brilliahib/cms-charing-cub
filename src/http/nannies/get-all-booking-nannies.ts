import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { api } from "@/lib/axios";
import { BookingNannies } from "@/types/booking/booking";

interface GetBookingNanniesResponse {
  data: BookingNannies[];
}

export const GetBookingNanniesHandler = async (
  token: string
): Promise<GetBookingNanniesResponse> => {
  const { data } = await api.get<GetBookingNanniesResponse>(
    "/nannies/booking/list",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

export const useGetBookingNannies = (
  token: string,
  options?: Partial<UseQueryOptions<GetBookingNanniesResponse, AxiosError>>
) => {
  return useQuery({
    queryKey: ["booking-nannies-list"],
    queryFn: () => GetBookingNanniesHandler(token),
    ...options,
  });
};
