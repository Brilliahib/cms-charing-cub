import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { api } from "@/lib/axios";
import { DayCareDetail } from "@/types/daycares/daycare";
import { BookingDaycare } from "@/types/booking/booking";

interface GetDetailBookingFromDaycareParams {
  id: number;
}

interface GetDetailBookingFromDaycareResponse {
  data: BookingDaycare;
}

export const GetDetailBookingFromDaycareHandler = async ({
  id,
}: GetDetailBookingFromDaycareParams): Promise<GetDetailBookingFromDaycareResponse> => {
  const { data } = await api.get<GetDetailBookingFromDaycareResponse>(
    `/users/daycares/booking/${id}`
  );

  return data;
};

export const useGetDetailBookingFromDaycare = (
  { id }: GetDetailBookingFromDaycareParams,
  options?: Partial<
    UseQueryOptions<GetDetailBookingFromDaycareResponse, AxiosError>
  >
) => {
  return useQuery({
    queryKey: ["booking-daycare-detail"],
    queryFn: () => GetDetailBookingFromDaycareHandler({ id }),
    ...options,
  });
};
