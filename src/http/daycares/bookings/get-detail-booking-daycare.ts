import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { api } from "@/lib/axios";
import { DayCareDetail } from "@/types/daycares/daycare";
import { BookingDaycare } from "@/types/booking/booking";

interface GetDetailBookingDaycareParams {
  id: string;
}

interface GetDetailBookingDaycareResponse {
  data: BookingDaycare;
}

export const GetDetailBookingDaycareHandler = async ({
  id,
}: GetDetailBookingDaycareParams): Promise<GetDetailBookingDaycareResponse> => {
  const { data } = await api.get<GetDetailBookingDaycareResponse>(
    `/users/daycares/booking/${id}`
  );

  return data;
};

export const useGetDetailBookingDaycare = (
  { id }: GetDetailBookingDaycareParams,
  options?: Partial<
    UseQueryOptions<GetDetailBookingDaycareResponse, AxiosError>
  >
) => {
  return useQuery({
    queryKey: ["booking-daycare-detail"],
    queryFn: () => GetDetailBookingDaycareHandler({ id }),
    ...options,
  });
};
