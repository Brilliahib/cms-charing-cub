import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { api } from "@/lib/axios";
import { BookingNannies } from "@/types/booking/booking";

interface GetDetailBookingNannniesParams {
  id: number;
  token: string;
}

interface GetDetailBookingNannniesResponse {
  data: BookingNannies;
}

export const GetDetailBookingNannniesHandler = async ({
  token,
  id,
}: GetDetailBookingNannniesParams): Promise<GetDetailBookingNannniesResponse> => {
  const { data } = await api.get<GetDetailBookingNannniesResponse>(
    `/users/nannies/booking/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

export const useGetDetailBookingNannnies = (
  { id, token }: GetDetailBookingNannniesParams,
  options?: Partial<
    UseQueryOptions<GetDetailBookingNannniesResponse, AxiosError>
  >
) => {
  return useQuery({
    queryKey: ["booking-nannies-detail"],
    queryFn: () => GetDetailBookingNannniesHandler({ id, token }),
    ...options,
  });
};
