import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { api } from "@/lib/axios";
import { BookingDaycare } from "@/types/booking/booking";

interface GetDetailBookingFromDaycareParams {
  id: string;
  token: string;
}

interface GetDetailBookingFromDaycareResponse {
  data: BookingDaycare;
}

export const GetDetailBookingFromDaycareHandler = async ({
  id,
  token,
}: GetDetailBookingFromDaycareParams): Promise<GetDetailBookingFromDaycareResponse> => {
  const { data } = await api.get<GetDetailBookingFromDaycareResponse>(
    `/users/daycares/booking/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

export const useGetDetailBookingFromDaycare = (
  { id, token }: GetDetailBookingFromDaycareParams,
  options?: Partial<
    UseQueryOptions<GetDetailBookingFromDaycareResponse, AxiosError>
  >
) => {
  return useQuery({
    queryKey: ["booking-daycare-detail"],
    queryFn: () => GetDetailBookingFromDaycareHandler({ id, token }),
    ...options,
  });
};
